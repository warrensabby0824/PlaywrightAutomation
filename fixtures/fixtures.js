import {test as base} from 'playwright-bdd';
import {LoginPage} from '../pageobjects/LoginPage';
import {CheckoutPage} from '../pageobjects/CheckoutPage';
import {DashboardPage} from '../pageobjects/DashboardPage';
import {MyCartPage} from '../pageobjects/MyCartPage';
import {OrderConfirmationPage} from '../pageobjects/OrderConfirmationPage';
import {OrdersListPage} from '../pageobjects/OrdersListPage';
import {OrderSummaryPage} from '../pageobjects/OrderSummaryPage';

export const test = base.extend(({
     loginPage: async({page},use)=> {
          const loginPage = new LoginPage(page);
          await use(loginPage);
     },
     checkoutPage: async({page},use)=> {
          const checkoutPage = new CheckoutPage(page);
          await use(checkoutPage);
     },
     dashboardPage: async({page},use)=> {
          const dashboardPage = new DashboardPage(page);
          await use(dashboardPage);
     },
     myCartPage: async({page},use)=> {
          const myCartPage = new MyCartPage(page);
          await use(myCartPage);
     },
     orderConfirmationPage: async({page},use)=> {
          const orderConfirmationPage = new OrderConfirmationPage(page);
          await use(orderConfirmationPage);
     },
     ordersListPage: async({page},use)=> {
          const ordersListPage = new OrdersListPage(page);
          await use(ordersListPage);
     },
     orderSummaryPage: async({page},use)=> {
          const orderSummaryPage = new OrderSummaryPage(page);
          await use(orderSummaryPage);
     },
}))