# Bus planner

A bus route planner. Made as a project for teaching myself Microsoft Web API and Angular.js. Additional techniques being used or planned to be used:
* Dapper
* Autofac
* Gulp
* Bower

## Prerequisites

This project has been developed and compiled using Visual Studio 2015. Additionally node.js with npm is needed and the npm package `gulp` is also required to run tests and other tasks.

## Compiling and Running

For the WebAPI project, make sure to restore the NuGet packages. For the Angular project, the npm and bower packages need to be installed by calling `npm install` in the BusPlanner.Web directory.

To avoid problems with the 248 directory character file limit on Windows, the node_modules directory should be made hidden (to avoid it being included in the Visual Studio project). Otherwise, the website cannot be hosted in IIS through Visual Studio.

## Running Tests

The Angular page comes with both unit tests and end to end tests. These can both be run via gulp. Run `gulp test` to run the unit tests or `gulp tdd` to continuously run unit tests on file changes. Run `gulp e2e` to perform the end-to-end tests.

Gulp needs to be installed globally for this to work. Install it with `npm install -g gulp`.