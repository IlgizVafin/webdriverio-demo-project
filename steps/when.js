var whenStepDefinitions = function () {
    this.When(/^I go to https:\/\/github\.com$/, {retry: 2},
        function () {
            browser.url("https://github.com");
        });

    this.When(/^I press button "([^"]*)"$/, {retry: 2},
        function (btnTitle) {
            browser.clickButton(btnTitle)
        });
};

module.exports = whenStepDefinitions;