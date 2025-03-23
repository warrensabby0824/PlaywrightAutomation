const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const { abort } = require('process');
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

test('network test', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);

    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
 
    //order summary page
    await page.locator("tbody").waitFor();
    const totalOrders = page.locator("tr[class='ng-star-inserted']");
    const totalOrderCount = await page.locator("tr[class='ng-star-inserted']").count();

    page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67c6ef16c019fb1ad615d988'})
    )
    for(let i = 0; i < totalOrderCount; ++i)
       {
          if (await totalOrders.nth(i).locator("th[scope='row']").textContent() === orderID) {
             await totalOrders.nth(i).locator("button.btn.btn-primary").click();
             break;
          }
       }
    await expect(page.locator('p[class="blink_me"]')).toHaveText('You are not authorize to view this order');

}

);

test.only('Child Handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.css',route=>route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

}
);

