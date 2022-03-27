# Coderscassonne
## CodersCamp2021.Project.Typescript

Fourth project of CodersCamp2021. Scallable web applications (Typescript).

## Repository structure

Repository is divided into frontend and backend part.

- Root directory contains basic configuration of prettier, vscode and husky.
- React code and setup of client side is keept in `frontend` directory.

## Preparation

1. Clone repository using `git clone {URL}` in the console.
2. Install node modules in `root` and `frontend` directory.

# Frontend - React

- React version > 17.0.0 (https://reactjs.org/docs/getting-started.html)
- React Router version > 6.0 (https://reactrouter.com/docs/en/v6)
- MaterialUI version > 5.0 (https://mui.com/getting-started/usage/)

## How to run app on your local device?

Prerequisites:
Node.js >=16 (https://nodejs.org/en/)

1. Navigate to the `frontend` directory using `cd frontend`.
2. Start development server with: `npm run dev` in the terminal.

By default server should be running here: localhost:3000

To stop local press `Ctrl+C`

## npm scripts

**following scripts works in `frontend` directory**

- `npm run dev`: starts vite development server;
- `npm run build`: builds for production;
- `npm run start`: starts preview of production build;
- `npm run test`: runs all tests;
- `npm run format`: formats all source files with prettier;

## Frontend structure

- index.jsx - entry point of React app;
- src/views - directory with views and containers used in the app;
- src/components - directory with components;
- src/model - directory with frontend model (eg. classes, maps);
- src/api - directory with code related to communication with APIs;
- src/common - directory with shared code (eg. formatters);
- src/constants - directory with project constants (eg. paths, labels);
- src/sass - directory with global scss styles;
- src/\_\_test\_\_ - directory with tests;

Components and Views should be placed in the sub-directory with all related files eg.:
`src/components/SuccessMessage/SuccessMessage.jsx`
`src/components/SuccessMessage/SuccessMessage.scss`

Keep tests in the same manner but inside \_\_test\_\_ directory eg.:
`src/__test__/api/dateFormatters.test.js`
`src/__test__/components/Button.test.js`

### Naming convention

- PascalCase - components, views, classes (eg. MainPage, Medication);
- camelCase - functions, variables, files not related to ones above (eg. changeMedicationFilter, isSelected);
- SCREAMING_SNAKE_CASE - constants (eg. PATH_TO_SETTINGS, ACCEPT_BUTTON_LABEL);

## Credits

Graphics designed by:


Photos by:
