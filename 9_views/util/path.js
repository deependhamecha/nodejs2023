const path = require('path');

/**
 * New implementation
 * module.exports = path.dirname(proceess.main.filename);
*/ 

var projectPath = path.dirname(process.mainModule.filename);

module.exports = {
    projectPath: projectPath
};