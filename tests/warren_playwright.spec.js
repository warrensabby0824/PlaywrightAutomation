const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');
 
test('@Web Client App login', async ({ page }) => {

   const userEmail = "anshika@gmail.com";
   const userPassword = "Iamking@000";
   const products = page.locator(".card-body");
   const productName = "ZARA COAT 3";

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(userEmail);
   await page.locator("#userPassword").fill(userPassword);
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
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


test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signInButton = page.locator("#signInBtn");
    const dropDownfield = page.locator("select.form-control");
    await dropDownfield.selectOption("consult");
    await page.locator("span.radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator("span.radiotextsty").last().isChecked());
    await expect (page.locator("span.radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
 
 })


test('Child Handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([

    context.waitForEvent('page'),
    documentLink.click(),

    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain  = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
 })

 test('Angular', async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/angularpractice/");
   await page.getByLabel("Check me out if you Love IceCreams!").check();
   await page.getByLabel("Employed").check();
   await page.getByLabel("Gender").selectOption("Female");
   await page.getByPlaceholder("Password").fill("abc123");
   await page.getByRole("button",{name:"submit"}).click();
   await page.getByText("The Form has been submitted successfully!.").isVisible();
   await page.getByRole("link",{name:"shop"}).click();

   await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button",{name:"Add"}).click();
})

test.only('Update using GetBy commands', async ({ page }) => {

   const userEmail = "anshika@gmail.com";
   const userPassword = "Iamking@000";
   const products = page.locator(".card-body");
   const productName = "ZARA COAT 3";

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(userEmail);
   await page.getByPlaceholder("enter your passsword").fill(userPassword);
   await page.getByRole("button",{name:"login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();

   await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
   await page.locator("div li").first().waitFor();

   // const isVisibleinCart = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   // expect (isVisibleinCart).toBeTruthy();

   const isVisibleinCart = await page.getByText("ZARA COAT 3").isVisible();
   expect (isVisibleinCart).toBeTruthy();

   await page.getByRole("button",{name:"Checkout"}).click();
   
   await page.locator(".input.ddl").first().selectOption("08");
   await page.locator(".input.ddl").last().selectOption("28");
   await page.locator(".field.small input[type='text']").first().fill("1234");
   await page.locator(".field input[class='input txt']").last().fill("Sabby De Leon");
   await page.locator(".field.small input[name='coupon']").fill("rahulshettyacademy");

   await page.locator("[type='submit']").click();
   const couponSuccessMessage = page.locator(".mt-1.ng-star-inserted");
   await couponSuccessMessage.waitFor();
   expect (await couponSuccessMessage.textContent()).toEqual("* Coupon Applied");

   //await page.locator("input[placeholder*='Country']").pressSequentially("Ind");
   await page.getByPlaceholder("Select Country").pressSequentially("Ind");

   // const countries = page.locator(".ta-results");
   // await countries.waitFor();
   // const countryList = page.locator(".ta-results button");

   // const countryCount = await countryList.count();

   // for(let i = 0; i < countryCount; ++i)
   //    {
   //       const countryText = await countryList.nth(i).textContent();
   //       if (countryText === " Indonesia") {
   //          await countryList.nth(i).click();
   //          break;
   //       }
   //    }

   await page.locator(".ta-results").getByRole("button",{name:" Indonesia"}).click();

   //expect(page.locator(".details__user label")).toHaveText(userEmail);
   await expect (page.getByText("anshika@gmail.com")).toHaveText(userEmail);
   //page.locator(".btnn.action__submit.ng-star-inserted").click();
   await page.getByText("PLACE ORDER").click();
   
   //order complete page
   await page.locator(".hero-primary").waitFor();
   //expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();
   
   const orderNumber = await page.locator(".box label[class='ng-star-inserted']").textContent();
   const orderArrayText = orderNumber.split(" ");
   const onlyOrderNumber  = orderArrayText[2];
   //await page.locator("button[routerlink*='myorders']").click();
   await page.getByRole("button",{name:"  ORDERS"}).click();

   //order summary page
   await page.locator("tbody").waitFor();
   // const totalOrders = page.locator("tr[class='ng-star-inserted']");
   // const totalOrderCount = await page.locator("tr[class='ng-star-inserted']").count();
   // for(let i = 0; i < totalOrderCount; ++i)
   //    {
   //       if (await totalOrders.nth(i).locator("th[scope='row']").textContent() === onlyOrderNumber) {
   //          await totalOrders.nth(i).locator("button.btn.btn-primary").click();
   //          break;
   //       }
   //    }

   await page.locator("tr[class='ng-star-inserted']").filter({hasText:onlyOrderNumber}).getByRole("button",{name:"View"}).click();
   
   //await page.locator(".email-title").waitFor();
   await page.getByText(" order summary ").waitFor();
   //await expect (page.locator(".email-title")).toHaveText(" order summary ");
   await expect(page.getByText(" order summary ")).toBeVisible();
   //await expect (page.locator(".email-container div.col-text.-main")).toHaveText(onlyOrderNumber);
   await expect(page.getByText(onlyOrderNumber)).toBeVisible();

})