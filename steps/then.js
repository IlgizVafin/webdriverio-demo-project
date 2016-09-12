var thenStepDefinitions = function() {
    this.When(/^I expect page title "([^"]*)"$/, {retry: 2},
        function (docTitle) {
            var title =  browser.getTitle();
            assert.equal(title.trim(), docTitle, ' title is "'+ title + '" but should be "'+ docTitle);
        });
};

module.exports = thenStepDefinitions;