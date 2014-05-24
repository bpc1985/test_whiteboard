var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/test_whiteboard',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://test:test@ds053948.mongolab.com:53948/test_whiteboard',
    port: process.env.PORT || 80
  }
}
