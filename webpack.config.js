const path = require('path');

module.exports = {
  entry: './scripts/video.js',
  output: {
    filename: 'video.js',
    path: path.resolve(__dirname, 'dist')
  }
};