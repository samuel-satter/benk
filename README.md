# Benk, a mock bank application

## A work in progress project written using TS, Rust, Java and Python

This project aims to create a functional but native mock bank application, its built using Rust tauri with TS and React as the frontend with a Java rest api as the backend and Python for mock data generation. Apart from creating the app, my goal with this project is to learn more about the interactions between different languages in programming and also to test what i have learned up untill this point in my career. It currently includes the following:

* A functioning Java Spring backend with innodb mysql implementation to create and manage users for the application
* A functioning React/tauri frontend utilizing TS and Rust
* A functioning Data generation system for creating mock users with Python

## Current structure of the project
```
|-- backend
|                   `-- benk
|                   `-- src
|           |       `-- main
|           |   |   `-- java
|           |   |   `-- com
|           |   |       `-- example
|           |   |           `-- benk
|           |   |               |-- config
|           |   |               |-- controller
|           |   |               |-- dto
|           |   |               |-- entity
|           |   |               |-- exception
|           |   |               |-- repository
|           |   |               |-- service
|           |   |               `-- utils
|           |   `-- resources
|           |       |-- static
|           |       `-- templates
|           `-- test
|               `-- java
|                   `-- com
|                       `-- example
|                           `-- benk
|-- data_generation
`-- frontend
    |-- dist
    |   `-- assets
    |-- public
    |-- src
    |   |-- admin
    |   |   |-- components
    |   |   |   |-- footer
    |   |   |   |-- menu
    |   |   |   |-- navbar
    |   |   |   `-- userBox
    |   |   `-- pages
    |   |       |-- finance
    |   |       |-- home
    |   |       `-- users
    |   |-- assets
    |   |-- components
    |   |   |-- create-account
    |   |   |-- forgot-password
    |   |   |-- login
    |   |   |-- reset-password
    |   |   `-- verify-code
    |   |-- styles
    |   `-- user
    |       |-- components
    |       |   `-- layout
    |       `-- pages
    |           `-- home
    `-- src-tauri
        |-- icons
        `-- src
```
## How to install/run
to be done...
