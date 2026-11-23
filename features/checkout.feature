@checkout
Feature: Checkout

  Background:
    Given I am logged in as "standard" user
    And I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I proceed to checkout

  @smoke @e2e
  Scenario: Complete a purchase
    When I enter checkout information "Dmytro", "QA", "01001"
    And I finish the order
    Then I should see the order confirmation "Thank you for your order!"

  @regression
  Scenario: Postal code is required
    When I enter checkout information "Dmytro", "QA", ""
    Then I should see the checkout error "Error: Postal Code is required"
