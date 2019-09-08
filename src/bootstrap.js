/**
 * ENVs here too!
 */
require('dotenv').config()
const env = Object.assign({}, process.env)

/**
 * Bootstrap app with HTML and SCSS
 */

/**
 * HTML template
 * Uncomment this line to inject your HTML with ENV variables
 * You should also remove the partial import in static/index.hbs
 */
// const appTemplate = require('./app.hbs')
// document.addEventListener('DOMContentLoaded', () => {
//   const appBody = document.createElement('div')
//   appBody.innerHTML = appTemplate(Object.assign({}, env))
//   document.body.appendChild(appBody)
// })

/**
 * SCSS import
 */
import './app.scss'
