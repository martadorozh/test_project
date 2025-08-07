Feature: Login validation

  Scenario: Login error when username is missing
    Given User is on the saucedemo main page
    When User clicks the Login button
    Then User should see "Epic sadface: Username is required" error message
