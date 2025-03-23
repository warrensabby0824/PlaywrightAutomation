class CheckoutPage {

constructor(page){

    this.page = page;
    this.expiryDateField = page.locator(".input.ddl");
    this.cvvCodeField = page.locator(".field.small input[type='text']").first();
    this.nameOnCardField = page.locator(".field input[class='input txt']").last();
    this.couponField = page.locator(".field.small input[name='coupon']");
    this.addCouponButton = page.locator("[type='submit']");
    this.couponSuccessMessage = page.locator(".mt-1.ng-star-inserted");
    this.countryField = page.locator("input[placeholder*='Country']");
    this.countriesResultList = page.locator(".ta-results");
    this.countriesResultArrayButton = page.locator(".ta-results button");
    this.shippingEmailInfo = page.locator(".details__user label");
    this.placeOrderButton = page.locator(".btnn.action__submit.ng-star-inserted");
}

async personalInfoInput(cardExpiryMonth,cardExpiryDate,cvvCode,cardName,couponCode){
    await this.expiryDateField.first().selectOption(cardExpiryMonth);
    await this.expiryDateField.last().selectOption(cardExpiryDate);
    await this.cvvCodeField.fill(cvvCode);
    await this.nameOnCardField.fill(cardName);
    await this.couponField.fill(couponCode);
}

async validateCoupon(){
    await this.addCouponButton.click();
    await this.couponSuccessMessage.waitFor();
    return this.couponSuccessMessage.textContent();
}

async inputShippingInfo(initialCountryInput,expectedCountryOutput){
    await this.countryField.pressSequentially(initialCountryInput);

    const countries = this.countriesResultList;
    await countries.waitFor();
    const countryList = this.countriesResultArrayButton;

    const countryCount = await countryList.count();

    for (let i = 0; i < countryCount; ++i) {
        //const countryText = await countryList.nth(i).textContent();
        if (await countryList.nth(i).textContent() === " " + expectedCountryOutput) {
            await countryList.nth(i).click();
            break;
        }
    }
    
}

async checkShippingEmail(){
    return this.shippingEmailInfo;
}

async placeOrder(){
    await this.placeOrderButton.click();
}

}
module.exports = {CheckoutPage};