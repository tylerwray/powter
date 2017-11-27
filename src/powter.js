const APP_ROOT = require('app-root-path').path
const methods = require('methods')
const path = require('path')

const powter = function(app, configFilePath) {
  if (!app) {
    throw new Error('No app provided to module powter')
  }

  if (!configFilePath) {
    throw new Error('No path provided to your router configuration file')
  }

  if (typeof configFilePath !== 'string') {
    throw new Error('Path to your router configuration file must be a string')
  }

  const config = require(path.join(APP_ROOT, configFilePath))

  const routes = Object.keys(config.paths || {})

  if (routes.length < 1) {
    return false
  }

  routes.forEach(route => {
    const routeConfig = config.paths[route]
    const controller = require(path.join(APP_ROOT, routeConfig.controller))

    methods.forEach(function(method) {
      let func = controller[method] || controller[routeConfig[method]]
      app[method](route, func)
    })
  })

  return true
}

module.exports = powter
