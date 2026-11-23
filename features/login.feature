@login
Feature: Login
  As a customer
  I want to log in to the store
  So that I can buy products

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I log in as "standard" user
    Then I should see the "Productz" page

  @regression
  Scenario: Locked out user cannot log in
    When I log in as "lockedOut" user
    Then I should see the login error "Epic sadface: Sorry, this user has been locked out."

  @regression
  Scenario Outline: Login validation - <case>
    When I log in with username "<username>" and password "<password>"
    Then I should see the login error "<error>"

    Examples:
      | case           | username      | password     | error                                                                     |
      | empty username |               | secret_sauce | Epic sadface: Username is required                                        |
      | empty password | standard_user |              | Epic sadface: Password is required                                        |
      | wrong password | standard_user | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
