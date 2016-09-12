var uuid = require('node-uuid');

var wrapper = {
    takeScreenshot: function() {
        browser.saveScreenshot('./errorShots/' + uuid.v4() + '-attachment.png');
    },

    clickButton: function(title) {

        var selector = '.btn*=' + title;

        browser.scroll(selector);
        browser.click(selector);

        return browser
    }
};

module.exports = wrapper;