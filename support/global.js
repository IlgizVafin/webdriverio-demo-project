var wrapper = function () {
    global.assert = require('assert');
    this.setDefaultTimeout(5 * 60 * 1000);
};

module.exports = wrapper;