# This is React App 

Created from FreeCodeCamp course [React JS Course for Beginners - 2021 Tutorial](https://youtu.be/nTeuhbP7wdE)

Use API from [The Movie Database](https://www.themoviedb.org/)

**If you fork this app from my Github you must:**
1. create `.env` file and provide api key (from The Movie Database) in a variable named: `REACT_APP_API_KEY` (or or provide it when deploying this app on [Netflify](https://www.netlify.com/)),

2. deploying this app on [Netflify](https://www.netlify.com/) or using the netlify CLI run command `netlify dev`.  
 

In addition to the functionalities presented in the course, I expanded the application with:

- language change function (Polish/English) [i18next library](https://www.i18next.com/),

- remembering the logged in user and the selected language after refreshing the page,

- log out functionality,

- changed font from abel to roboto to support polish language,

- added information if user rate movie before and display it 

- increased the accuracy of the rating (increments of 0.5 to be more compatible with the API),

- add update rate functionality and spinner

- I secured the API key with [serverless Netflify functions](https://www.netlify.com/products/functions/),

- responsiveness fix 
  
  - changing subtitles into icons  in headears when screen size is below 460px 
  
  - hiding username information when screen size is below 460px
  
  - changing movie rating and director infromations layout

***

***

# Original README.md provided by the course author

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
