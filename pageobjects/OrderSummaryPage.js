class OrderSummaryPage {

constructor(page){
this.page = page;
this.orderSummaryTitle = page.locator(".email-title");
this.orderSummaryOrderNumber = page.locator(".email-container div.col-text.-main");

}

async extractOrderSummaryTitle(){

    await this.orderSummaryTitle.waitFor();
    return await this.orderSummaryTitle.textContent();
}

async extractOrderNumber(){
    return this.orderSummaryOrderNumber.textContent();
}
    
   

}
module.exports = {OrderSummaryPage};