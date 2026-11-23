@cart
Feature: Shopping cart

  Background:
    Given I am logged in as "standard" user

  @smoke
  Scenario: Add a product to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  @regression
  Scenario: Remove a product from the cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should show "1"

  @regression
  Scenario: Cart page lists added products
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I open the cart
    Then the cart should contain:
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
