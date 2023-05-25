package env

import (
	"errors"
	"fmt"
	"log"
	"os"
	"path"
	"strings"

	"github.com/joho/godotenv"
)

// Global Constants
const (
	Development string = "development"
	Production  string = "production"
)

// Global Variables
var env = map[string]string{}

func getEnvFiles(envDir string, mode string) (files []string) {
	files = []string{}
	dir := path.Clean(envDir)

	for _, s := range []string{"", "." + mode} {
		f0 := fmt.Sprintf("%s/.env%s", dir, s)
		f1 := fmt.Sprintf("%s/.env%s.local", dir, s)
		files = append(files, f0, f1)
	}

	return
}

func loadEnv(
	mode string,
	envDir string,
	envVarCondition func(string) bool,
) (err error) {
	err = nil

	// Gets environment variables from `.env` files.
	for _, file := range getEnvFiles(envDir, mode) {
		m, e := godotenv.Read(file)

		// Only ignores "file does not exist" error.
		if e != nil && !errors.Is(e, os.ErrNotExist) {
			err = e
			return
		}

		for k, v := range m {
			if envVarCondition(k) {
				env[k] = v // duplicate environment variables are overwritten
			}
		}
	}

	// Gets environment variables from the SHELL enviornment.
	for _, envKeyValue := range os.Environ() {
		kv := strings.SplitN(envKeyValue, "=", 2)
		if envVarCondition(kv[0]) {
			env[kv[0]] = kv[1] // duplicate environment variables are overwritten
		}
	}

	return
}

/*
 * This function is modeled after the `loadEnv` function from Vite.
 */
func LoadEnv(mode string, envDir string, prefixes ...string) (err error) {
	return loadEnv(mode, envDir, func(envVar string) bool {
		for _, prefix := range prefixes {
			if strings.HasPrefix(envVar, prefix) {
				return true
			}
		}

		return false
	})
}

func Clear() {
	env = map[string]string{}
}

func Exists(variable string) bool {
	_, ok := env[variable]

	return ok
}

func Get(variable string) (value string) {
	value, ok := env[variable]
	if !ok {
		log.Panicf("env: environment variable '%s' was not loaded.", variable)
	}

	return
}

func Show() {
	for k, v := range env {
		fmt.Printf("%s: %s\n", k, v)
	}
}
