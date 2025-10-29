// openapi/users-api.js
export const openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'Versioned user API demo with v1 and v2 routes'
    },
    paths: {
      '/v1/users': {
        get: {
          summary: 'Get users (v1)',
          responses: {
            200: {
              description: 'List of users from version 1',
              content: { 'application/json': {} }
            }
          }
        }
      },
      '/v2/users': {
        get: {
          summary: 'Get users (v2)',
          responses: {
            200: {
              description: 'List of users from version 2',
              content: { 'application/json': {} }
            }
          }
        }
      }
    }
  };
  