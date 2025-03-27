const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { MyCartPage } = require('../pageobjects/MyCartPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { OrderConfirmationPage } = require('../pageobjects/OrderConfirmationPage');
const { OrdersListPage } = require('./OrdersListPage');
const { OrderSummaryPage } = require('../pageobjects/OrderSummaryPage');

class POManager {

constructor(page){
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.myCartPage = new MyCartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.orderConfirmationPage = new OrderConfirmationPage(this.page);
    this.ordersListPage = new OrdersListPage(this.page);
    this.orderSummaryPage = new OrderSummaryPage(this.page);

}

getLoginPage(){

    return this.loginPage;
}

getDashboardPage(){

    return this.dashboardPage;
}

getMyCartPage(){

    return this.myCartPage;
}

getCheckoutPage(){

    return this.checkoutPage;
}

getOrderConfirmationPage(){

    return this.orderConfirmationPage;
}

getOrdersListPage(){

    return this.ordersListPage;
}

getOrderSummaryPage(){

    return this.orderSummaryPage;
}


}
module.exports = {POManager};