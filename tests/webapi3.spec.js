const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const loginPayLoad = { userEmail: "ysabella.deleon@gmail.com", userPassword: "Sabsab1234" };
const orderCreationPayLoad = { orders: [{ country: "Indonesia", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakeOrderResponsePayload = { data: [], message: "No Orders" };
let token;
let orderID;

// let response;

test.beforeAll(async () => {
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext);
   token = await apiUtils.getToken(loginPayLoad);
   orderID = await apiUtils.createOrder(orderCreationPayLoad, token);
}
);


test('Web Client App login', async ({ page }) => {

   //set local storage with given value
   page.addInitScript(value => {

      window.localStorage.setItem('token', value);

   }, token);

   await page.goto("https://rahulshettyacademy.com/client/");
   await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
      async route => {
         const response = await page.request.fetch(route.request())
         let body = JSON.stringify(fakeOrderResponsePayload);
         route.fulfill(
            {
               response,
               body
            }
         );
      }
   );

   await page.locator("button[routerlink*='myorders']").click();
   await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')

   //order summary page
   await page.locator("tbody").waitFor();
   await page.pause();


})