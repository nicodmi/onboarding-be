# Overview

This is a template for microservices using [Fastify](https://github.com/fastify/fastify) framework.

## TECHNOLOGIES
  
-   [**NodeJS v10**](https://nodejs.org/docs/latest-v10.x/api/index.html)
-   **[Fastify](https://www.fastify.io/):** As servier
-   **[JestJS](https://jestjs.io/):** For testing
-   **[Eslint](https://eslint.org/):** For linting
-   **[Google Cloud](https://cloud.google.com/)**: As cloud provider
-   **[Kubernetes](https://kubernetes.io/)**: For container orchestration
-   **[Docker](https://www.docker.com/)**: For container generation
-   **[Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines):** As CI
-   **[SonarCloud](https://sonarcloud.io/)**: For static code analisys

## PLUGINS

### CommerceTools

Includes the [fastify-commercetools](https://bitbucket.org/devgurus/fastify-commercetools/) plugin that decorates fastify with repositories for handle CT entities

### Health

Includes the [fastify-healthcheck](https://github.com/smartiniOnGitHub/fastify-healthcheck#readme) plugin and creates two health endpoints:

-   GET */live*
-   GET */ready*

### Metrics

Includes the [fastify-metrics](https://github.com/SkeLLLa/fastify-metrics) plugin and expose the `/metrics` endpoint for export Prometheus metrics

### Logging

In terms of logging, there is no rule carved on stone, but you can follow this guide to ensure the process as a constant configurations across all the services built with this template.

By default Fastify has six log levels:
-   info
-   error
-   debug
-   fatal
-   warn
-   trace

In your code, you could use it in the next way:

```javascript
const fastify = require('fastify');
...
fastify.get('/', options, function (request, reply) {
  request.log.info('Some info about the current request');
  reply.send({ hello: 'world' });
})
```

```bash
#Output
{"level":"info","time":1603386364271,"pid":35702,"hostname":"YourComputerName","reqId":1,"res":{"statusCode":200},"responseTime":1290.3010230064392,"msg":"Some info about the current request}
```

But what about the shape of logger? Well Pino come as part of Fastify and is pretty fast forward to configure:

``` javascript
// src/server/index.js
const Fastify = fastify({
   logger: {
      useLevelLabels: true,
      prettyPrint: false,
      redact: {
         //add here sensible fields that should not be logged
         paths: [
            'key',
            'body.password',
            'password',
            'Authorization',
            'headers.Authorization'
         ],
         censor: '*********'
      },
      serializers: {
         req(req) {
            return {
               method: req.method,
               url: req.url,
               hostname: req.hostname,
               path: req.path,
               parameters: req.parameters,
               id: req.id
            };
         }
      }
   }
});
```

> Fastify uses [Pino](getpino.io) logger. For further information visit [https://www.fastify.io/docs/v2.0.x/Logging/](https://www.fastify.io/docs/v2.0.x/Logging/)

### Schemas and Commercetools

In order to validate schemas to use Commercetools valid payload, you need to use the library *commercetools-entities-schemas*. To see an example go to `src/api/example/`.

### PusSub

Plugin that decorates fastify with a PubSubService for publish and read messages to/from a Google Cloud topic

### Swagger

Plugin for generate swagger documentation based on OpenApi v3

### Error Handler

#### Error Response

The error response object is based on [JSON API specification](https://jsonapi.org/format/1.1/#errors) and has the following structure:
Error objects must be returned as an array keyed by `errors`

-   **id**: unique identifier for this particular occurrence of the problem.
-   **status**: the HTTP status code applicable to this problem
-   **code**: an internal specific error code
-   **title**: a short, human-readable summary of the problem
-   **detail**: a human-readable explanation
-   **meta**: a meta object containing non-standard meta-information

Example:

```javascript
{
 errors: [
    {
     status: "422",
     title: "Invalid Attribute",
     code: "INVALID_ATTRIBUTE",
     detail: "The attribute 'foo' is not valid"
    }
 ];
}

```

## NPM Scripts

-   **lint**: runs linting using eslint/prettier
-   **lint-fix**: runs linting and fix the errors
-   **start**: runs the server in port 4444 by default
-   **start-dev**: runs the server with nodemon with hot reloading
-   **test**: runs the project tests and shows coverage
-   **swagger**: generates the swagger documentation in the folder */docs*

## Environment variables

The following variables must be defined/overwritten so that the service can work properly

| VARIABLE                  | DESCRIPTION                   | DEFAULT                         |
| ------------------------- | ----------------------------- | ------------------------------- |
| NODE_ENV                  | Environment                   | Development                     | 
| HOST                      | Server address                | localhost                       |
| PORT                      | Server port                   | 4444                            |
| CT_API_URL                | commercetools API URL         | [https://api.commercetools.co](https://api.commercetools.co)  |
| CT_AUTH_URL               | commercetools auth URL        | [https://auth.commercetools.co](https://api.commercetools.co)  |
| CT_PROJECT_KEY            | commercetools project key     | -                               |
| CT_CLIENT_ID              | commercetools client id       | -                               |
| CT_CLIENT_SECRET          | commercetools client secret   | -                               |
| CT_SCOPE                  | commercetools scope           | -                               |
| GC_PROJECT_ID             | The Google Cloud project id   | -                               |
| DEPLOY_TOKEN_USERNAME     | Token to download image       | -                               |
| DEPLOY_TOKEN_PASSWORD     | Token to download image       | -                               |
| GCP_GKE_CLUSTER_NAME      | GKE cluster name              | -                               |
| GCP_GKE_CLUSTER_NAMESPACE | GKE cluster namespace         | -                               |
| GCP_PROJECT_ID            | The Google Cloud project id   | -                               |
| GCP_REGION                | GKE cluster region            | -                               |

## Container notes
If you are running the image in a containerized environment without any proxy (such as istio-proxy),
you must allow, in the Fastify server, requests from any source by changing the varialbe HOST to 0.0.0.0

## Local development
You can run the module in your local environment

### Install dependencies
```shell
npm install
```
### Run linter
```shell
npm run lint --fix
```
### Start server
```shell
npm run start-dev
```
### Unit tests
```shell
npm run test
```
### With Docker
```shell
docker build -t devgurus/fastify-microservice-template .
docker run -it --entrypoint sh -p 4444:4444 --env HOST=0.0.0.0 devgurus/fastify-microservice-template
```
### Example request
```shell
curl --location --request GET 'http://localhost:4444/?queryOne=test'
```
