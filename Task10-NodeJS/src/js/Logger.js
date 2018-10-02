const fs = require('fs');
const path = require('path');

class Logger {
  constructor(filename) {
    this.filePath = path.join(__dirname, 'logs', filename);
    this.fd = fs.openSync(this.filePath, 'w');
  }

  log(level, message) {
    let errorLevel = level;
    if (!errorLevel) {
      errorLevel = 'Unknown error';
    }
    const logString = `[${new Date().toLocaleString()}] [${errorLevel}] - ${message}\n`;

    fs.appendFileSync(this.filePath, logString, 'utf8');
  }

  validationError(message) {
    this.log('Validation error', message);
  }

  error(message) {
    this.log('Server error', message);
  }

  stop() {
    fs.close(this.fd);
  }
}

module.exports = Logger;
