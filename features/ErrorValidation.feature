Feature: Error validation

  @ErrorValidation
  Scenario: Placing order
    Given User login to the application2 with "rahulshetty" and "learning"
    Then Verify if error message was displayed.
    
   
   