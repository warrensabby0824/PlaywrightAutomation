const { test, expect } = require('@playwright/test');

test('Calendar Test', async ({ page }) => {
    
    const calendarMonth = "3";
    const calendarDate = "16";
    const calendarYear = "2028";
    const expectedList = [calendarMonth,calendarDate,calendarYear];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    const calendarCount = await page.locator(".react-calendar__tile").count();
    const calendarList = page.locator(".react-calendar__tile");
    for(let i = 0; i < calendarCount; ++i)
        {
           if (await calendarList.nth(i).textContent() === calendarYear) {
              await calendarList.nth(i).click();
              break;
           }
        }
    
    //await page.getByText(calendarYear).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(calendarMonth)-1).click();
    await page.locator("//abbr[text()='"+calendarDate+"']").click();

    const dateInput = page.locator(".react-date-picker__inputGroup__input");
    for (let i = 0;i < dateInput.length; i++){
        const value = dateInput[i].getattribute("value");
        expect(value).toEqual(expectedList[i]); 

    }

 })