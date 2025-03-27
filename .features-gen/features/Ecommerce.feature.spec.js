// Generated from: features\Ecommerce.feature
import { test } from "../../fixtures/fixtures.js";

test.describe('E-commerce validation', () => {

  test('Placing order', { tag: ['@Regression'] }, async ({ Given, loginPage, When, dashboardPage, Then, myCartPage, checkoutPage, And, orderConfirmationPage, ordersListPage, orderSummaryPage }) => { 
    await Given('User login to the application with "ysabella.deleon@gmail.com" and "Sabsab1234"', null, { loginPage }); 
    await When('product "ZARA COAT 3" is added to the cart', null, { dashboardPage }); 
    await Then('verify if "ZARA COAT 3" was successfully added', null, { dashboardPage, myCartPage }); 
    await When('User checksout and shipping information was entered', {"dataTable":{"rows":[{"cells":[{"value":"cardExpiryMonth"},{"value":"08"}]},{"cells":[{"value":"cardExpiryDate"},{"value":"28"}]},{"cells":[{"value":"cvvCode"},{"value":"1234"}]},{"cells":[{"value":"cardName"},{"value":"Sabby De Leon"}]},{"cells":[{"value":"couponCode"},{"value":"rahulshettyacademy"}]},{"cells":[{"value":"expectedCouponMessage"},{"value":"* Coupon Applied"}]},{"cells":[{"value":"initialCountryInput"},{"value":"Ind"}]},{"cells":[{"value":"expectedCountryOutput"},{"value":"Indonesia"}]}]}}, { myCartPage, checkoutPage }); 
    await And('order was placed', null, { checkoutPage }); 
    await Then('Order confirmation will be successfull', {"dataTable":{"rows":[{"cells":[{"value":"expectedThankYouMessage"}]},{"cells":[{"value":"Thankyou for the order."}]}]}}, { orderConfirmationPage }); 
    await When('User search for the newly created order in the Orders page and view its details', null, { orderConfirmationPage, dashboardPage, ordersListPage }); 
    await Then('Order details will be displayed correctly in the Order Summary page', {"dataTable":{"rows":[{"cells":[{"value":"expectedOrderSummaryPageTitle"}]},{"cells":[{"value":"order summary"}]}]}}, { orderSummaryPage }); 
  });

  test('Placing order without login in UI', { tag: ['@api'] }, async ({ Given, loginPage, page, When, dashboardPage, ordersListPage, Then, orderSummaryPage }) => { 
    await Given('User opens the shopping page', null, { loginPage, page }); 
    await When('User search for the newly created order via API in the Orders page and view its details', null, { dashboardPage, ordersListPage }); 
    await Then('Order details will be displayed correctly in the Order Summary page for orders created in API', {"dataTable":{"rows":[{"cells":[{"value":"expectedOrderSummaryPageTitle"}]},{"cells":[{"value":"order summary"}]}]}}, { orderSummaryPage }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\Ecommerce.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@Regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given User login to the application with \"ysabella.deleon@gmail.com\" and \"Sabsab1234\"","stepMatchArguments":[{"group":{"start":35,"value":"\"ysabella.deleon@gmail.com\"","children":[{"start":36,"value":"ysabella.deleon@gmail.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":67,"value":"\"Sabsab1234\"","children":[{"start":68,"value":"Sabsab1234","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When product \"ZARA COAT 3\" is added to the cart","stepMatchArguments":[{"group":{"start":8,"value":"\"ZARA COAT 3\"","children":[{"start":9,"value":"ZARA COAT 3","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then verify if \"ZARA COAT 3\" was successfully added","stepMatchArguments":[{"group":{"start":10,"value":"\"ZARA COAT 3\"","children":[{"start":11,"value":"ZARA COAT 3","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When User checksout and shipping information was entered","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And order was placed","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then Order confirmation will be successfull","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When User search for the newly created order in the Orders page and view its details","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then Order details will be displayed correctly in the Order Summary page","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":29,"tags":["@api"],"steps":[{"pwStepLine":18,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given User opens the shopping page","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When User search for the newly created order via API in the Orders page and view its details","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then Order details will be displayed correctly in the Order Summary page for orders created in API","stepMatchArguments":[]}]},
]; // bdd-data-end