
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const { Before, BeforeAll, After, AfterAll, AfterStep} = require('@cucumber/cucumber');
const path = require('path');


Before(async function () {
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