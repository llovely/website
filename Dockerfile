#
# Website is created using a multi-stage build (to reduce final image size).
#


################################################################################
# Stage 1: Creates the production build of the website
################################################################################
FROM node:20-alpine AS client-build

WORKDIR /app/env
COPY env/. .

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/. .
RUN npm run build


################################################################################
# Stage 2: Creates the webserver that will serve the website
################################################################################
FROM golang:1.20-alpine as server-build

WORKDIR /app/server
COPY server/go.* ./
RUN go mod download
COPY server/*.go .
RUN CGO_ENABLED=0 GOOS=linux go build .


################################################################################
# Stage 3: Creates the final image for the website (small image size ~14MB)
################################################################################
FROM alpine:latest

COPY --from=client-build /app/env /app/env
COPY --from=client-build /app/client/dist /app/client/dist
COPY --from=server-build /app/server/webserver /app/server/webserver

WORKDIR /app/server


################################################################################
# Stage 4: Runs the website in the container
################################################################################

CMD ./webserver
