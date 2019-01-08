/*
 * Primary file for the API
 *
 *
 *
 */

// Dependencies
const http = require('http')
const https = require('https')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const config = require('./lib/config')
const fs = require('fs')
const handlers = require('./lib/handlers')
const helpers = require('./lib/helpers')

// Instantiate HTTP server
const httpServer = http.createServer(function(req, res) {
  unifiedServer(req, res)
})

// Start the HTTP server
httpServer.listen(config.httpPort, function(){
  console.log('The server is listening on port ' + config.httpPort + ' in ' + config.envName + ' mode')
})

// Instantiate HTTPS server
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
}
const httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  unifiedServer(req, res)
})

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function(){
  console.log('The server is listening on port ' + config.httpsPort + ' in ' + config.envName + ' mode')
})

// Server logic for both http and https servers
const unifiedServer = function (req, res) {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true)

  // Get the path from URL
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '') // removing slashes from begin and end of the path

  // Get the query string as an object
  const queryStringObject = parsedUrl.query

  // Get the HTTP method
  const method = req.method.toLowerCase()

  // Get the headers as an object
  const headers = req.headers

  // Get the payload if any
  const decoder = new StringDecoder('utf-8') // parameter - what encoding shoul be received. This is common
  let buffer = '' // buffer - just variable name,
  req.on('data', function(data){
    buffer += decoder.write(data)
  })
  req.on('end', function(){
    buffer += decoder.end()

    // Choose the handler this request should go to, if not found - use notFound handler
    const choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

    // Construct the data object to send to the handler
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload : helpers.parseJsonToObject(buffer)
    }

    // Route the request to the handler specified in the router
    choosenHandler(data, function(statusCode, payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof(payload) === 'object' ? payload : {}

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload)

      // Return the response
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)

      // Log the response data
      console.log('Returning response:', statusCode, payloadString)
    })
  })
}

// Define a request router
const router = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
  checks: handlers.checks
}