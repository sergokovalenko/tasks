const fs = require('fs');
const path = require('path');

class Logger {
  constructor(filename) {
    this.filePath = path.join(__dirname, 'logs', filename);
  }

  log(level, message) {
    let errorLevel = level;
    if (!errorLevel) {
      errorLevel = 'Unknown error';
    }
    const logString = `[${new Date().toUTCString()}] [${errorLevel}] - ${message}\n`;

    fs.openSync(this.filePath, 'w');
    fs.appendFileSync(this.filePath, logString, 'utf8');
    fs.closeSync(this.filePath);
  }

  validationError(message) {
    this.log('Validation error', message);
  }

  error(message) {
    this.log('Server error', message);
  }
}

module.exports = Logger;
