# Description

Front-end quick development framework based on Angular4.

This project is using [Angular CLI](https://github.com/angular/angular-cli)

## Development
1. Run `npm install`
2. Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build-dev` or `npm run build-prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## How it works

### Structure
```
├── e2e
├── lib
└── src
    ├── app
    │   ├── about
    │   ├── home
    │   ├── notfound
    │   └── services
    │       └── remote
    ├── assets
    ├── common
    │   ├── components
    │   ├── directives
    │   ├── partials
    │   ├── pipes
    │   └── services
    └── config
```

### Details
1. Entry: `src/app/app.module.ts`.
2. `src/config/config.ts` is local config file, it will **ignored** by git
3. `src/config/routes.ts` is route config, it will be used to bind route with components
4. `src/config/intro.ts` is for [intro.js](https://github.com/usablica/intro.js)
5. All common components and services are located in `src/common` folder
6. Add your code in `app` and `app/services`


## Note
* You can add 3rd party libraries in `src/app/app.modules.ts`
* For assets like images or other assets
  + Global assets, you can put it in `src/assets`
  + Component assets, you just put it in component folder, and reference it by **relative path** in you html file
