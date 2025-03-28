import { createBdd } from 'playwright-bdd';
import {test} from '../../fixtures/fixtures';
const {Given,When,Then} = createBdd(test);
const { expect, request } = require('@playwright/test');
const { APIUtils } = require('../../utils/APIUtils');
const loginPayloadjson = JSON.parse(JSON.stringify(require("../../utils/loginPayLoad.json")));
const orderCreationPayloadjson = JSON.parse(JSON.stringify(require("../../utils/orderCreationPayLoad.json")));
let orderNumber;
let latestUsername;
let orderID;

Given('User login to the application with {string} and {string}', async ({loginPage}, username, password) => {
     await loginPage.goToLoginPage(process.env.URL);
     await loginPage.validLogin(username, password);
   
     latestUsername = username;
   });
   
   When('product {string} is added to the cart', async ({dashboardPage}, productname) => {

     await dashboardPage.searchForProduct(productname);
   });
   
   Then('verify if {string} was successfully added', async ({dashboardPage,myCartPage}, productname) => {

     await dashboardPage.goToCart();
     const isVisibleinCart = await myCartPage.validateProductInCart(productname);
     await expect (isVisibleinCart).toBeTruthy();
   });
   
   When('User checksout and shipping information was entered', async ({myCartPage,checkoutPage}, dataTable) => {

     const data = dataTable.rowsHash();
     await myCartPage.checkoutCart();
     await checkoutPage.personalInfoInput(data.cardExpiryMonth,data.cardExpiryDate,data.cvvCode,data.cardName,data.couponCode);
     const actualCouponSuccessMessage = await checkoutPage.validateCoupon();
     await expect(actualCouponSuccessMessage).toEqual(data.expectedCouponMessage);
     await checkoutPage.inputShippingInfo(data.initialCountryInput, data.expectedCountryOutput);
     await expect(await checkoutPage.checkShippingEmail()).toHaveText(latestUsername);
   });
   
   When('order was placed', async ({checkoutPage}) => {

     await checkoutPage.placeOrder();
   });
   
   Then('Order confirmation will be successfull', async ({orderConfirmationPage}, dataTable) => {

     const data = dataTable.hashes();
     for (const row of data) {
     const thankYouMessage = await orderConfirmationPage.validateThankYouMessage();
     await expect (thankYouMessage.trim()).toEqual(row.expectedThankYouMessage);
     }
   });
   
   When('User search for the newly created order in the Orders page and view its details', async ({orderConfirmationPage,dashboardPage,ordersListPage}) => {

     orderNumber = await orderConfirmationPage.extractOrderNumber();
     await dashboardPage.goToOrders();
     await ordersListPage.searchForOrder(orderNumber);
   });
   
   Then('Order details will be displayed correctly in the Order Summary page', async ({orderSummaryPage}, dataTable) => {

     const data = dataTable.hashes();
     for (const row of data) {
     const orderSummaryTitle = await orderSummaryPage.extractOrderSummaryTitle();
     await expect (orderSummaryTitle.trim()).toEqual(row.expectedOrderSummaryPageTitle);
     const actualOrderNumber = await orderSummaryPage.extractOrderNumber();
     await expect (actualOrderNumber).toEqual(orderNumber);
     }
   });
   
   Given('User opens the shopping page', async ({loginPage, page}) => {
     const apiContext = await request.newContext();
     const apiUtils = new APIUtils(apiContext);

     const token = await apiUtils.getToken(loginPayloadjson);
     orderID = await apiUtils.createOrder(orderCreationPayloadjson,token);
    
     await page.addInitScript(value => {

       window.localStorage.setItem('token',value);

   }, token);
     
     await loginPage.goToLoginPage(process.env.URL);
   });
   
   When('User search for the newly created order via API in the Orders page and view its details', async ({dashboardPage,ordersListPage}) => {

     await dashboardPage.goToOrders();
     await ordersListPage.searchForOrder(orderID);
   });

   Then('Order details will be displayed correctly in the Order Summary page for orders created in API', async ({orderSummaryPage}, dataTable) => {
     
     const data = dataTable.hashes();
     for (const row of data) {
     const orderSummaryTitle = await orderSummaryPage.extractOrderSummaryTitle();
     await expect (orderSummaryTitle.trim()).toEqual(row.expectedOrderSummaryPageTitle);
     const actualOrderNumber = await orderSummaryPage.extractOrderNumber();
     await expect (actualOrderNumber).toEqual(orderID);
     }
   });