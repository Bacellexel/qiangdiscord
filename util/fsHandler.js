const fs = require('fs');

module.exports = {
  /**
  * @param {string} filePath Path where the file is located. E.G : ./some_directory/file.json
  * @param {Object} jsonData The JSON data to write
  **/
  writeJSON: function(filePath, jsonData) {
    fs.writeFileSync(filePath, JSON.stringify(jsonData));
  }
}
