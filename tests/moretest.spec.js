const { test, expect } = require('@playwright/test');

test('Pop up Test', async ({ page }) => {
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
    await page.goBack();

    await expect (page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect (page.locator("#displayed-text")).toBeHidden();

    
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const congratsMessage = await framesPage.locator(".text h2").textContent();
    const congratsMessageArray = congratsMessage.split(" ");
    console.log(congratsMessageArray[1]);

 })

 test.only('Capture Image', async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect (page.locator("#displayed-text")).toBeVisible();
    await page.locator('input[placeholder="Hide/Show Example"]').screenshot({path:'partialscreenshot.jpg'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.jpg'});
    await expect (page.locator("#displayed-text")).toBeHidden();

 })