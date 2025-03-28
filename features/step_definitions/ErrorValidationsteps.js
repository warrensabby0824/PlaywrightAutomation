import { createBdd } from 'playwright-bdd';
import {test} from '../../fixtures/fixtures';
const {Given,When,Then} = createBdd(test);
const { expect } = require('@playwright/test');

Given('User login to the application2 with {string} and {string}', async ({page}, username, password) => {
     await page.goto(process.env.URL2);
     await page.locator("#username").fill(username);
     await page.locator("#password").fill(password);
     await page.locator("#signInBtn").click();
   });
   
   Then('Verify if error message was displayed.', async ({page}) => {
    await expect (page.locator("[style*='block']")).toContainText("Incorrect");
   });