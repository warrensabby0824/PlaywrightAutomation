Feature: E-commerce validation

  @Regression
  Scenario: Placing order
    Given User login to the application with "ysabella.deleon@gmail.com" and "Sabsab1234"
    When product "ZARA COAT 3" is added to the cart
    Then verify if "ZARA COAT 3" was successfully added
    When User checksout and shipping information was entered
      | cardExpiryMonth       | 08                 |
      | cardExpiryDate        | 28                 |
      | cvvCode               | 1234               |
      | cardName              | Sabby De Leon      |
      | couponCode            | rahulshettyacademy |
      | expectedCouponMessage | * Coupon Applied   |
      | initialCountryInput   | Ind                |
      | expectedCountryOutput | Indonesia          |

        And order was placed
    Then Order confirmation will be successfull
      | expectedThankYouMessage |
      | Thankyou for the order. |
    When User search for the newly created order in the Orders page and view its details
    Then Order details will be displayed correctly in the Order Summary page
      | expectedOrderSummaryPageTitle |
      | order summary                 |
    

  @api
  Scenario: Placing order without login in UI
    Given User opens the shopping page
    When User search for the newly created order via API in the Orders page and view its details
    Then Order details will be displayed correctly in the Order Summary page for orders created in API
      | expectedOrderSummaryPageTitle |
      | order summary                 |
   
   