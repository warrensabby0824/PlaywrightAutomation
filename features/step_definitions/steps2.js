import { createBdd } from "playwright-bdd";
const {Given,When,Then} = createBdd();
const { expect, request } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const { APIUtils } = require('../../utils/APIUtils');
const loginPayloadjson = JSON.parse(JSON.stringify(require("../../utils/loginPayLoad.json")));
const orderCreationPayloadjson = JSON.parse(JSON.stringify(require("../../utils/orderCreationPayLoad.json")));
let orderNumber;
let latestUsername;
let orderID;

Given('User login to the application with {string} and {string}', async ({page}, username, password) => {

     const poManager = new POManager(page);
     const loginPage = poManager.getLoginPage();
     console.log(process.env.URL);
     await loginPage.goToLoginPage();
     await loginPage.validLogin(username, password);
   
     latestUsername = username;
   });
   
   When('product {string} is added to the cart', async ({page}, productname) => {
     const poManager = new POManager(page);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchForProduct(productname);
   });
   
   Then('verify if {string} was successfully added', async ({page}, productname) => {
     const poManager = new POManager(page);
     const dashboardPage = poManager.getDashboardPage();
     const myCartPage = poManager.getMyCartPage();
     await dashboardPage.goToCart();
     const isVisibleinCart = await myCartPage.validateProductInCart(productname);
     await expect (isVisibleinCart).toBeTruthy();
   });
   
   When('User checksout and shipping information was entered', async ({page}, dataTable) => {
     const poManager = new POManager(page);
     const myCartPage = poManager.getMyCartPage();
     const checkoutPage = poManager.getCheckoutPage();
     const data = dataTable.rowsHash();
     await myCartPage.checkoutCart();
     await checkoutPage.personalInfoInput(data.cardExpiryMonth,data.cardExpiryDate,data.cvvCode,data.cardName,data.couponCode);
     const actualCouponSuccessMessage = await checkoutPage.validateCoupon();
     await expect(actualCouponSuccessMessage).toEqual(data.expectedCouponMessage);
     await checkoutPage.inputShippingInfo(data.initialCountryInput, data.expectedCountryOutput);
     await expect(await checkoutPage.checkShippingEmail()).toHaveText(latestUsername);
   });
   
   When('order was placed', async ({page}) => {
     const poManager = new POManager(page);
     const checkoutPage = poManager.getCheckoutPage();
     await checkoutPage.placeOrder();
   });
   
   Then('Order confirmation will be successfull', async ({page}, dataTable) => {
     const poManager = new POManager(page);
     const orderConfirmationPage = poManager.getOrderConfirmationPage();
     const data = dataTable.hashes();
     for (const row of data) {
     const thankYouMessage = await orderConfirmationPage.validateThankYouMessage();
     await expect (thankYouMessage.trim()).toEqual(row.expectedThankYouMessage);
     }
   });
   
   When('User search for the newly created order in the Orders page and view its details', async ({page}) => {
     const poManager = new POManager(page);
     const orderConfirmationPage = poManager.getOrderConfirmationPage();
     const dashboardPage = poManager.getDashboardPage();
     const ordersListPage = poManager.getOrdersListPage();
     orderNumber = await orderConfirmationPage.extractOrderNumber();
     await dashboardPage.goToOrders();
     await ordersListPage.searchForOrder(orderNumber);
   });
   
   Then('Order details will be displayed correctly in the Order Summary page', async ({page}, dataTable) => {
     const poManager = new POManager(page);
     const orderSummaryPage = poManager.getOrderSummaryPage();
     const data = dataTable.hashes();
     for (const row of data) {
     const orderSummaryTitle = await orderSummaryPage.extractOrderSummaryTitle();
     await expect (orderSummaryTitle.trim()).toEqual(row.expectedOrderSummaryPageTitle);
     const actualOrderNumber = await orderSummaryPage.extractOrderNumber();
     await expect (actualOrderNumber).toEqual(orderNumber);
     }
   });
   
   Given('User opens the shopping page', async ({page}) => {
     const apiContext = await request.newContext();
     const apiUtils = new APIUtils(apiContext);
     
     const poManager = new POManager(page);
     const loginPage = poManager.getLoginPage();

     const token = await apiUtils.getToken(loginPayloadjson);
     orderID = await apiUtils.createOrder(orderCreationPayloadjson,token);
    
     await page.addInitScript(value => {

       window.localStorage.setItem('token',value);

   }, token);
     
     await loginPage.goToLoginPage();
   });
   
   When('User search for the newly created order via API in the Orders page and view its details', async ({page}) => {
     const poManager = new POManager(page);
     const dashboardPage = poManager.getDashboardPage();
     const ordersListPage = poManager.getOrdersListPage();
     await dashboardPage.goToOrders();
     await ordersListPage.searchForOrder(orderID);
   });

   Then('Order details will be displayed correctly in the Order Summary page for orders created in API', async ({page}, dataTable) => {
     const poManager = new POManager(page);
     const orderSummaryPage = poManager.getOrderSummaryPage();
     
     const data = dataTable.hashes();
     for (const row of data) {
     const orderSummaryTitle = await orderSummaryPage.extractOrderSummaryTitle();
     await expect (orderSummaryTitle.trim()).toEqual(row.expectedOrderSummaryPageTitle);
     const actualOrderNumber = await orderSummaryPage.extractOrderNumber();
     await expect (actualOrderNumber).toEqual(orderID);
     }
   });