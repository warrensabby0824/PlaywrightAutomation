const ExcelJs =require('exceljs');
const { test, expect } = require('@playwright/test');



async function writeExcel(searchText,replaceText,change,fileLocation) {
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(fileLocation);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(fileLocation);

};

async function readExcel(worksheet,searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {

                output.row = rowNumber;
                output.column = colNumber;
            }

        })
    }
    )
    return output;
};


test.only('Upload Download Excel Validation',async ({page})=>{

    const searchWord = 'Banana';
    const updatedValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/')
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await downloadPromise;

    await writeExcel(searchWord,updatedValue,{rowChange:0,colChange:2},"C:/Users/user/Downloads/download.xlsx");
    await page.locator('#fileinput').setInputFiles('C:/Users/user/Downloads/download.xlsx');
    await expect(page.getByRole('row').filter({hasText:searchWord}).locator('#cell-4-undefined')).toHaveText(updatedValue);
})