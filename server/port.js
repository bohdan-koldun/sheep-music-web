const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.WEB_PORT || '3000', 10);
