// Generated from: features\Ecommerce.feature
import { test } from "../../fixtures/fixtures.js";

test.describe('E-commerce validation', () => {

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
  {"pwTestLine":6,"pickleLine":29,"tags":["@api"],"steps":[{"pwStepLine":7,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given User opens the shopping page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When User search for the newly created order via API in the Orders page and view its details","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then Order details will be displayed correctly in the Order Summary page for orders created in API","stepMatchArguments":[]}]},
]; // bdd-data-end