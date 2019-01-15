/*
 * Creqte and export configuration variables
 *
 *
*/

// Container for all the environments
const environments = {}

// Staging (defauld) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
  hashingSecret: 'thisIsASecret',
  maxChecks: 5,
  twilio: {
    accountSid: 'ACb32d411ad7fe886aac54c665d25e5c5d',
    authToken: '9455e3eb3109edc12e3d8c92768f7a67',
    fromPhone: '+15005550006'
  },
  templateGlobals: {
    appName: 'UptimeChecker',
    companyName: 'NotARealCompany, Inc',
    yearCreated: '2018',
    baseUrl: 'http://localhost:3000'
  }
}

// Testing environment
environments.testing = {
  httpPort: 4000,
  httpsPort: 4001,
  envName: 'staging',
  hashingSecret: 'thisIsASecret',
  maxChecks: 5,
  twilio: {
    accountSid: 'ACb32d411ad7fe886aac54c665d25e5c5d',
    authToken: '9455e3eb3109edc12e3d8c92768f7a67',
    fromPhone: '+15005550006'
  },
  templateGlobals: {
    appName: 'UptimeChecker',
    companyName: 'NotARealCompany, Inc',
    yearCreated: '2018',
    baseUrl: 'http://localhost:3000'
  }
}

// Production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  hashingSecret: 'thisIsAlsoASecret',
  maxChecks: 5,
  twilio: {
    accountSid: '',
    authToken: '',
    fromPhone: ''
  },
  templateGlobals: {
    appName: 'UptimeChecker',
    companyName: 'NotARealCompany, Inc',
    yearCreated: '2018',
    baseUrl: 'http://localhost:5000'
  }
}

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// Check that the current environment is one of the environments above, if no - default to staging
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging

// Export the module
module.exports = environmentToExport
