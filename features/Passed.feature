Feature: Passed feature

  @Passed
  Scenario: Go to github.com and press signup button
    When I go to https://github.com
    And I press button "Sign up for GitHub"
    Then I expect page title "Join GitHub · GitHub"