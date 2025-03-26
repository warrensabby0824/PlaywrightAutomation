//copying current storage state then using it to login
const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll( async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("anshika@gmail.com");
        await page.locator("#userPassword").fill("Iamking@000");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await context.storageState({path:'state.json'});
        webContext = await browser.newContext({storageState:'state.json'});
    }
    );
 
test('@API Web Client App login', async () => {


    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")

    const userEmail = "anshika@gmail.com";
    const userPassword = "Iamking@000";
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 

    const productCount = await products.count();
    for(let i = 0; i < productCount; ++i)
    {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator(".btn.w-10.rounded").click();
            break;
        }
    }

    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();

    const isVisibleinCart = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect (isVisibleinCart).toBeTruthy();

    await page.locator("text=checkout").click();
    await page.locator(".input.ddl").first().selectOption("08");
    await page.locator(".input.ddl").last().selectOption("28");
    await page.locator(".field.small input[type='text']").first().fill("1234");
    await page.locator(".field input[class='input txt']").last().fill("Sabby De Leon");
    await page.locator(".field.small input[name='coupon']").fill("rahulshettyacademy");

    await page.locator("[type='submit']").click();
    const couponSuccessMessage = page.locator(".mt-1.ng-star-inserted");
    await couponSuccessMessage.waitFor();
    expect (await couponSuccessMessage.textContent()).toEqual("* Coupon Applied");

    await page.locator("input[placeholder*='Country']").pressSequentially("Ind");
    const countries = page.locator(".ta-results");
    await countries.waitFor();
    const countryList = page.locator(".ta-results button");

    const countryCount = await countryList.count();

    for(let i = 0; i < countryCount; ++i)
        {
            const countryText = await countryList.nth(i).textContent();
            if (countryText === " Indonesia") {
                await countryList.nth(i).click();
                break;
            }
        }
    expect(page.locator(".details__user label")).toHaveText(userEmail);
    page.locator(".btnn.action__submit.ng-star-inserted").click();
    
    //order complete page
    await page.locator(".hero-primary").waitFor();
    expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderNumber = await page.locator(".box label[class='ng-star-inserted']").textContent();
    const orderArrayText = orderNumber.split(" ");
    const onlyOrderNumber  = orderArrayText[2];
    await page.locator("button[routerlink*='myorders']").click();

    //order summary page
    await page.locator("tbody").waitFor();
    const totalOrders = page.locator("tr[class='ng-star-inserted']");
    const totalOrderCount = await page.locator("tr[class='ng-star-inserted']").count();
    for(let i = 0; i < totalOrderCount; ++i)
        {
            if (await totalOrders.nth(i).locator("th[scope='row']").textContent() === onlyOrderNumber) {
                await totalOrders.nth(i).locator("button.btn.btn-primary").click();
                break;
            }
        }
    
    await page.locator(".email-title").waitFor();
    await expect (page.locator(".email-title")).toHaveText(" order summary ");
    await expect (page.locator(".email-container div.col-text.-main")).toHaveText(onlyOrderNumber);

})
