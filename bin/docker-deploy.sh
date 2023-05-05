#!/usr/bin/env bash
#
# Website deployment script.
#

# Global Constants
readonly TARGET_BRANCH='main'
readonly DOCKER_COMPOSE_FILE='docker-compose.yml'
readonly DOCKER_COMPOSE_ENV_FILE='./src/env/.env'
# $SERVICES are the container names described in $$DOCKER_COMPOSE_FILE.
declare -ra SERVICES=( 'website' )
declare -ra WEBSITE_STATES=( 'UP' 'DOWN' 'INCONSISTENT' 'UNKNOWN' )


# Globals
WEBSITE_STATE='UNKNOWN'


# Writes error message(s) to stderr.
function err_msg() {
  local messages="$*"

  printf "ERROR: ${messages}\n" >&2
}


# Writes message(s) to stdout.
function out_msg() {
  local messages="$*"

  printf "${messages}\n"
}


################################################################################
# Determines the current state of the website services (Docker containters);
# the determined state is located in the global variable $WEBSITE_STATE.
# Globals:
#   SERVICES
#   WEBSITE_STATE
# Arguments:
#   None
# Outputs:
#   Writes error message(s) to stderr.
# Returns:
#   0 if the state of the website services are determined; otherwise, non-zero
#   on error.
################################################################################
function website_get_state() {
  declare -a services_up
  declare -a return_codes

  for service in "${SERVICES[@]}"; do
    docker ps --format "table {{.ID}}\t{{.Names}}" 2> /dev/null \
      | grep -q "${service}"
    return_codes=( "${PIPESTATUS[@]}" )
    if (( return_codes[0] != 0 )); then
      err_msg "Failed to get list of running Docker containers."
      WEBSITE_STATE='UNKNOWN'
      return 1
    elif (( return_codes[1] == 0 )); then
      services_up+=( "${service}" )
    fi
  done

  if (( ${#services_up[@]} == ${#SERVICES[@]} )); then
    WEBSITE_STATE='UP'
  elif (( ${#services_up[@]} > 0 )); then
    err_msg "Not all website services are up; running in an inconsistent state."
    WEBSITE_STATE='INCONSISTENT'
  else
    WEBSITE_STATE='DOWN'
  fi
}


################################################################################
# Shuts down the website.
# Globals:
#   None
# Arguments:
#   None
# Outputs:
#   Writes shutdown step(s) to stdout; writes error message(s) to stderr.
# Returns:
#   0 if website shutdown successfully; otherwise, non-zero on error.
################################################################################
function website_down() {
  out_msg "\nAttempting to shutdown website services (Docker containers)..."
  if ! docker-compose down -v; then
    err_msg "Failed to shutdown website services."
    return 1
  fi
  out_msg "Website services shutdown."
}


################################################################################
# Starts up the website.
# Globals:
#   None
# Arguments:
#   None
# Outputs:
#   Writes start up step(s) to stdout; writes error message(s) to stderr.
# Returns:
#   0 if the website starts up successfully; otherwise, non-zero on error.
################################################################################
function website_up() {
  out_msg "\nAttempting to startup website services (Docker containers)..."
  docker-compose -f "${DOCKER_COMPOSE_FILE}" \
    --env-file "${DOCKER_COMPOSE_ENV_FILE}" up -d --build 
  if (( $? != 0 )); then
    err_msg "Failed to startup website services."
    return 1
  fi
  out_msg "Website services are up."
}


################################################################################
# Verifies that the $TARGET_BRANCH is the active git branch; otherwise, attempts
# to switch to it.
# Globals:
#   TARGET_BRANCH
# Arguments:
#   None
# Outputs:
#   Writes branch verificiation step(s) to stdout; writes error message(s) to
#   stderr.
# Returns:
#   0 if the $TARGET_BRANCH is set as the current branch; otherwise, non-zero on
#   error.
################################################################################
function verify_branch() {
  local current_branch

  out_msg "\nVerifying if repository's current branch is '${TARGET_BRANCH}'..."

  current_branch="$(git rev-parse --abbrev-ref HEAD 2> /dev/null)"
  if (( $? != 0 )); then
    err_msg "Unable to obtain repository's current branch."
    return 1
  fi

  if [[ "${current_branch}" == "${TARGET_BRANCH}" ]]; then
    out_msg "Confirmed."
    return 0
  fi

  out_msg "Current branch is '${current_branch}'; switching to " \
          "'${TARGET_BRANCH}' branch..."
  if ! git switch "${TARGET_BRANCH}"; then
    err_msg "Failed to switch to '${TARGET_BRANCH}' branch."
    return 1
  fi
  out_msg "The current branch is now '${TARGET_BRANCH}'."
}


################################################################################
# Pulls the lastest changes from origin.
# Globals:
#   TARGET_BRANCH
#   WEBSITE_STATE
# Arguments:
#   None
# Outputs:
#   Writes pull step(s) to stdout; writes error message(s) to stderr.
# Returns:
#   0 if changes successfully pulled or if repository is already up-to-date;
#   otherwise, non-zero on error.
################################################################################
function pull_changes() {
  local head_hash
  local upstream_hash

  out_msg "\nDetermining if any changes exist from origin/${TARGET_BRANCH}..."

  if ! git fetch origin &> /dev/null; then
    err_msg "Unable to fetch changes for origin/${TARGET_BRANCH}."
    return 1
  fi

  head_hash="$(git rev-parse HEAD 2> /dev/null)"
  if (( $? != 0 )); then
    err_msg "Unable to obtain local HEAD commit hash."
    return 1
  fi

  upstream_hash="$(git rev-parse ${TARGET_BRANCH}@{upstream} 2> /dev/null)"
  if (( $? != 0 )); then
    err_msg "Unable to obtain origin/${TARGET_BRANCH} HEAD commit hash."
    return 1
  fi

  if [[ "${head_hash}" == "${upstream_hash}" ]]; then
    out_msg "Current branch is up-to-date with origin/${TARGET_BRANCH}."
    return 0
  else
    out_msg "Changes found!"
  fi

  website_get_state
  case "${WEBSITE_STATE}" in
    'UP')           website_down || return 1 ;;
    'DOWN')         ;;
    'INCONSISTENT') website_down || return 1 ;;
    *)              return 1 ;;
  esac

  out_msg "\nPulling changes from origin/${TARGET_BRANCH}..."
  if ! git pull origin "${TARGET_BRANCH}"; then
    err_msg "Unable to successfully pull changes from origin/${TARGET_BRANCH}."
    return 1
  fi
  out_msg "Current branch is now up-to-date with origin/${TARGET_BRANCH}."
}


# Entry point of this script.
function main() {
  local SCRIPT_DIR

  out_msg "Obtaining full filepath of this script's parent directory..."
  SCRIPT_DIR="$({ cd "$(dirname "${BASH_SOURCE[0]}")" && pwd; } 2> /dev/null)"
  if (( $? != 0 )); then
    err_msg "Unable to determine full filepath of script's parent directory."
    return 1
  fi
  out_msg "Filepath: '${SCRIPT_DIR}'"


  out_msg "\nEntering project's root directory..."
  if ! cd "${SCRIPT_DIR}/.."; then
    err_msg "Failed to enter the project's root directory: '${SCRIPT_DIR}/..'"
    return 1
  fi
  out_msg "Project's root directory: '${SCRIPT_DIR}/..'"


  # out_msg "\nVerifying if inside a git repository..."
  # if ! git rev-parse --is-inside-work-tree &> /dev/null; then
  #   err_msg "This is not a git repository."
  #   return 1
  # fi
  # out_msg "Confirmed."


  # verify_branch || return 1


  # pull_changes || return 1


  out_msg "\nDeploying website..."
  website_get_state
  case "${WEBSITE_STATE}" in
    'UP')
      out_msg "Website is already deployed and running!"
      return 0
      ;;
    'DOWN')
      website_up || return 1
      ;;
    'INCONSISTENT')
      website_down && website_up || return 1
      ;;
    *)
      err_msg "Unable to deploy website."
      return 1
      ;;
  esac
  out_msg "\nWebsite successfully deployed!"
}


main "$@"
