# React TODO app written four ways

I created this project in order to see the differences between using...
- class components vs functional components (hook API)
- holding data in state vs context

Please note that there may be some debatable or inconsistent design choices that were made for the purpose of trying how things can be implemented.

I've added explanations in comments denoted by `NOTE:`.

The important files are in the `src/components` and `tests/TodoPage` directories.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
I ejected react-scripts for finer control over the configuration (such as the test directory).

## Implementation

## Tests

The tests for all of the TodoPages are the same. Minor bits that can be changed based on the implementation are noted using comments.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
