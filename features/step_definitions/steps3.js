import { createBdd } from "playwright-bdd";
const {Given,When,Then} = createBdd();

Given('User login to the application2 with {string} and {string}', async ({}, username, password) => {
     await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await this.page.locator("#username").fill(username);
     await this.page.locator("#password").fill(password);
     await this.page.locator("#signInBtn").click();
   });
   
   Then('Verify if error message was displayed.', async ({}) => {
    await expect (this.page.locator("[style*='block']")).toContainText("Incorrect");
   });