
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const { Before, After} = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { APIUtils } = require('../../utils/APIUtils');
const loginPayLoad = {userEmail: "ysabella.deleon@gmail.com", userPassword: "Sabsab1234"}
const orderCreationPayLoad = {orders: [{country: "Indonesia", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
// let token;
// let orderID;


Before(async function () {
    const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
  });
  
Before({tags: "@api"}, async function () {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext);
  this.token = await apiUtils.getToken(loginPayLoad);
  this.orderID = await apiUtils.createOrder(orderCreationPayLoad,this.token);

  const browser = await playwright.chromium.launch({headless:false});
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

  After(function () {
    console.log("I am the last to execute!!!")
  });


//   AfterStep(async function ({result}) {
//   if(result.status === Status.FAILED){
//     await this.page.screenshot({path:'screenshot1.png'});
//   }
//   });