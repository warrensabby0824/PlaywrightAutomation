
const { expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

let orderNumber;

Given('User login to the application with {string} and {string}',{timeout:100*1000}, async function (username, password) {
    
  // const browser = await playwright.chromium.launch({headless:false});
  // const context = await browser.newContext();
  // const page = await context.newPage();
  // this.poManager = new POManager(page);
  this.loginPage = this.poManager.getLoginPage();
  this.dashboardPage = this.poManager.getDashboardPage();
  this.myCartPage = this.poManager.getMyCartPage();
  this.checkoutPage = this.poManager.getCheckoutPage();
  this.orderConfirmationPage = this.poManager.getOrderConfirmationPage();
  this.ordersListPage = this.poManager.getOrdersListPage();
  this.orderSummaryPage = this.poManager.getOrderSummaryPage();
  console.log(process.env.URL);
  await this.loginPage.goToLoginPage();
  await this.loginPage.validLogin(username, password);

  this.username = username;
  });


  When('product {string} is added to the cart', async function (productname) {
    await this.dashboardPage.searchForProduct(productname);
  });

  Then('verify if {string} was successfully added', async function (productname) {
    await this.dashboardPage.goToCart();
    const isVisibleinCart = await this.myCartPage.validateProductInCart(productname);
    await expect (isVisibleinCart).toBeTruthy();
  });

  When('User checksout and shipping information was entered',{timeout:100*1000}, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.myCartPage.checkoutCart();
    await this.checkoutPage.personalInfoInput(data.cardExpiryMonth,data.cardExpiryDate,data.cvvCode,data.cardName,data.couponCode);
    const actualCouponSuccessMessage = await this.checkoutPage.validateCoupon();
    await expect(actualCouponSuccessMessage).toEqual(data.expectedCouponMessage);
    await this.checkoutPage.inputShippingInfo(data.initialCountryInput, data.expectedCountryOutput);
    await expect(await this.checkoutPage.checkShippingEmail()).toHaveText(this.username);

    // await this.myCartPage.checkoutCart();
    // for (const row of data) {
    //   await this.checkoutPage.personalInfoInput(row.cardExpiryMonth,row.cardExpiryDate,row.cvvCode,row.cardName,row.couponCode);
    //   const actualCouponSuccessMessage = await this.checkoutPage.validateCoupon();
    //   await expect (actualCouponSuccessMessage).toEqual(row.expectedCouponMessage);
    //   await this.checkoutPage.inputShippingInfo(row.initialCountryInput,row.expectedCountryOutput);
    //   await expect(await this.checkoutPage.checkShippingEmail()).toHaveText(this.username);
    // }
    
  });

  When('order was placed',{timeout:100*1000} ,async function () {
    await this.checkoutPage.placeOrder();
  });

  Then('Order confirmation will be successfull',{timeout:100*1000},async function (dataTable) {
    const data = dataTable.hashes();
    for (const row of data) {
    const thankYouMessage = await this.orderConfirmationPage.validateThankYouMessage();
    await expect (thankYouMessage.trim()).toEqual(row.expectedThankYouMessage);
    }
  });

  When('User search for the newly created order in the Orders page and view its details', async function () {
    orderNumber = await this.orderConfirmationPage.extractOrderNumber();
    await this.dashboardPage.goToOrders();
    await this.ordersListPage.searchForOrder(orderNumber);
  });

  Then('Order details will be displayed correctly in the Order Summary page', async function (dataTable) {
    const data = dataTable.hashes();
    for (const row of data) {
    const orderSummaryTitle = await this.orderSummaryPage.extractOrderSummaryTitle();
    await expect (orderSummaryTitle.trim()).toEqual(row.expectedOrderSummaryPageTitle);
    const actualOrderNumber = await this.orderSummaryPage.extractOrderNumber();
    await expect (actualOrderNumber).toEqual(orderNumber);
    }
  });


  Given('User login to the application2 with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#signInBtn").click();
  
    });

    Then('Verify if error message was displayed.', async function () {
    await expect (this.page.locator("[style*='block']")).toContainText("Incorrect");
      
    });


    Given('User opens the shopping page',{timeout:100*1000}, async function () {

      this.loginPage = this.poManager.getLoginPage();
      this.dashboardPage = this.poManager.getDashboardPage();
      this.ordersListPage = this.poManager.getOrdersListPage();
      this.orderSummaryPage = this.poManager.getOrderSummaryPage();
     
      await this.page.addInitScript(value => {

        window.localStorage.setItem('token',value);

    }, this.token);
      
      await this.loginPage.goToLoginPage();

    });

    When('User search for the newly created order via API in the Orders page and view its details',{timeout:100*1000}, async function () {
      await this.dashboardPage.goToOrders();
      await this.ordersListPage.searchForOrder(this.orderID);
    });


    Then('Order details will be displayed correctly in the Order Summary page for orders created in API', async function (dataTable) {
      const data = dataTable.hashes();
      for (const row of data) {
      const orderSummaryTitle = await this.orderSummaryPage.extractOrderSummaryTitle();
      await expect (orderSummaryTitle.trim()).toEqual(row.expectedOrderSummaryPageTitle);
      const actualOrderNumber = await this.orderSummaryPage.extractOrderNumber();
      await expect (actualOrderNumber).toEqual(this.orderID);
      }
    });