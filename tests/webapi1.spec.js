//calling APIUTILS and updating token to have access in the application

const { test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail: "ysabella.deleon@gmail.com", userPassword: "Sabsab1234"}
const orderCreationPayLoad = {orders: [{country: "Indonesia", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
let token;
let orderID;

// let response;

test.beforeAll( async ()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext);
   token = await apiUtils.getToken(loginPayLoad);
   orderID = await apiUtils.createOrder(orderCreationPayLoad,token);
}
);


test('@API Web Client App login', async ({ page }) => {

    //set local storage with given value
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);

    }, token);
    console.log(process.env.URL);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
 
    //order summary page
    await page.locator("tbody").waitFor();
    const totalOrders = page.locator("tr[class='ng-star-inserted']");
    const totalOrderCount = await page.locator("tr[class='ng-star-inserted']").count();
    for(let i = 0; i < totalOrderCount; ++i)
       {
          if (await totalOrders.nth(i).locator("th[scope='row']").textContent() === orderID) {
             await totalOrders.nth(i).locator("button.btn.btn-primary").click();
             break;
          }
       }
    
    await page.locator(".email-title").waitFor();
    await expect (page.locator(".email-title")).toHaveText(" order summary ");
    await expect (page.locator(".email-container div.col-text.-main")).toHaveText(orderID);
 
 })