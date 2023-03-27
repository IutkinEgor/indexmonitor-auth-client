# Indexmonitor Authorization Client

The Indexmonitor Authorization Client is built on top of Angular 15 and provides a clean user interface for the Indexmonitor Authorization Server. It utilizes Angular Material library and Bootstrap 5.0 for the grid system, as flex-layout is not supported in Angular 15. It also uses ngrx for state management.

## Features

### User Interface

The Indexmonitor Authorization Client provides the following UI features:

* Clients and scopes management
* Users, roles and authorities management

### State Management

The application utilizes ngrx for state management, providing the following features:

* Each module has it own store for user and application data
* Strict type checking for state data
* Actions and reducers for managing state changes

## Issues

The project is still in development mode and has a number of unsolved problems

## Architecture

### Standart module layout

- src
  - module-name
    - components   
        - comp-1
        - comp-2
        - ...
    - services
    - store
    - types
    - component.module.ts

# Dependencies

The Indexmonitor Authorization Client relies on the following dependencies:

* Angular 15
* Angular Material library
* Bootstrap 5.0
* ngrx

# Building from Source

To build the application from source, follow these steps:

1. Clone the repository.
2. Install dependencies using the following command:
  ```bash
  npm install
  ```
3. Run the application using the following command:
  ```bash
  ng serve
  ```
