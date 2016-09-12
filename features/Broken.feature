Feature: Broken feature

  @Broken
  Scenario: Go to github.com and press non-existent button
    When I go to https://github.com
    And I press button "Non-existent button"
    Then I expect page title "Join GitHub · GitHub"