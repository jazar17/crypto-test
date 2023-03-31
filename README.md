# Crypto Wallet Test

## Overview

This is project's aim is to create an api to be able to add crypto wallet addresses with their names and be able to retrieve their balances from the Goerli Network.

Task link: https://gist.github.com/AdamPetroff/55a8fe4c68d6501d311963059811abf3

## Instructions on running for development

* install node with npm
* install pnpm by running "`npm i -g pnpm`"
* install all dependencies by running "`pnpm i`"
* generate prisma by running "`pnpm prisma:generate`"
* create a `.env.development.local` file with using the `.env.sample` file as template
  * `PORT` - the port number to be used by the api
  * `DATABASE_URL` - path of the sqlite database
  * `GOERLI_NETWORK` - the goerli network path
  * `LOG_FORMAT` - [morgan's](https://www.npmjs.com/package/morgan) log format
  * `LOG_DIR` - the directory where the logs will be created
  * `ORIGIN` - the comma separated cors origin for example: "`http://localhost,https://google.com`"
* run the application using `pnpm dev`
* to check the api docs go to http://localhost:3000/api-docs

## Instructions on running tests

* create a `.env.test.local` file with using the `.env.sample` file as template
  * `PORT` - the port number to be used by the api
  * `DATABASE_URL` - path of the sqlite database
  * `GOERLI_NETWORK` - the goerli network path
  * `LOG_FORMAT` - [morgan's](https://www.npmjs.com/package/morgan) log format
  * `LOG_DIR` - the directory where the logs will be created
  * `ORIGIN` - the comma separated cors origin for example: "`http://localhost,https://google.com`"
* run the application using `pnpm test`