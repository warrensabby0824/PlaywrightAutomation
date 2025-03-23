class MyCartPage {

    constructor(page){
        this.page = page;
        this.cartItems = page.locator('div li');
        this.checkoutButton = page.locator("text=checkout");
    }

async validateProductInCart(productName){

    await this.cartItems.first().waitFor();
    const isVisibleinCart = await this.page.locator("h3").getByText(productName).isVisible();
    return isVisibleinCart;
}

async checkoutCart(){

    await this.checkoutButton.click();
}

}
module.exports = {MyCartPage};