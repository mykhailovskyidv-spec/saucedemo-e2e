@sorting @regression
Feature: Product sorting

  Background:
    Given I am logged in as "standard" user

  Scenario: Sort products by price, low to high
    When I sort products by "Price (low to high)"
    Then product prices should be sorted ascending

  Scenario: Sort products by price, high to low
    When I sort products by "Price (high to low)"
    Then product prices should be sorted descending

  Scenario: Sort products by name, Z to A
    When I sort products by "Name (Z to A)"
    Then the first product should be "Test.allTheThings() T-Shirt (Red)"
