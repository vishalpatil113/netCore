# Smtapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



https://github.com/angular/angular-cli/issues/4246
http://dxtright.com/index.php/2017/12/05/angular-no-module-factory-available-dependency-type-contextelementdependency/


Package.json: remove webpack from DevDependencies
rm -R node_modules (remove node_modules folder)
npm i -g webpack
npm i -g webpack-dev-server
remove package-lock.json (if it’s there)
npm i
npm start
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)

## Troubleshooting
To fix node-sass installation, please refer to https://docs.npmjs.com/getting-started/fixing-npm-permissions

## For local development purpose use below command,
## NOTE :: chnage client name, domain in  --deploy-url option
 ng build --poll=2000 --deploy-url="https://du.netcore.co.in/prdev_dinesh/angular/dist/" --output-hashing none --watch
