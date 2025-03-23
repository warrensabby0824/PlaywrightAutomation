class OrderConfirmationPage{

constructor(page){
this.page = page;
this.thankYouMessage = page.locator(".hero-primary");
this.inPageOrderNumber = page.locator(".box label[class='ng-star-inserted']");

}

async validateThankYouMessage (){

    await this.thankYouMessage.waitFor();
    return await this.thankYouMessage.textContent();
}

async extractOrderNumber (){
    const orderNumber = await this.inPageOrderNumber.textContent();
    const orderArrayText = orderNumber.split(" ");
    const onlyOrderNumber  = orderArrayText[2];
    return onlyOrderNumber;

}
   


}
module.exports = {OrderConfirmationPage}