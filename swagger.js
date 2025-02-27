const swaggerAuto = require('swagger-autogen')

const swaggerAutogen = swaggerAuto()

const doc = {
  info: {
    title: 'OPR API',
    description: 'Description'
  },
  // host: '192.168.1.13:4000'
  // host: '192.168.29.103:4000'
  // host: '192.168.232.138:4000'
  // host: '192.168.232.138:4000'
  host: '192.168.29.103:4000'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);