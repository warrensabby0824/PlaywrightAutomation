class OrdersListPage{

    constructor(page){

        this.page = page;
        this.orderTable = page.locator("tbody");
        this.allOrders = page.locator("tr[class='ng-star-inserted']");


    }

    async searchForOrder (orderNumber){
        await this.orderTable.waitFor();
        const totalOrders = this.allOrders;
        const totalOrderCount = await this.allOrders.count();
        for(let i = 0; i < totalOrderCount; ++i)
           {
              if (await totalOrders.nth(i).locator("th[scope='row']").textContent() === orderNumber) {
                 await totalOrders.nth(i).locator("button.btn.btn-primary").click();
                 break;
              }
           }

    }
    


}
module.exports = {OrdersListPage};