class DashboardPage {

constructor(page){
    this.page = page;
    this.allProducts = page.locator(".card-body");
    this.allProductsTitle = page.locator(".card-body b");
    this.cartButton = page.locator("[routerlink='/dashboard/cart']");
    this.ordersButton = page.locator("button[routerlink*='myorders']");
}

async searchForProduct(productName){
    
    await this.allProductsTitle.first().waitFor();
    const titles = await this.allProductsTitle.allTextContents();
    console.log(titles); 

    const productCount = await this.allProducts.count();
    for(let i = 0; i < productCount; ++i)
    {
       if (await this.allProducts.nth(i).locator("b").textContent() === productName) {
          await this.allProducts.nth(i).locator(".btn.w-10.rounded").click();
          break;
       }
    }
}

async goToCart(){
   await this.cartButton.click();
}

async goToOrders(){
   await this.ordersButton.click();
}

}

module.exports = {DashboardPage};