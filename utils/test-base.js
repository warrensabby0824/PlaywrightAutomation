const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
testDataForOrder : {

        userEmail: "ysabella.deleon@gmail.com",
        userPassword: "Sabsab1234",
        productName: "ZARA COAT 3",
        cardExpiryMonth: "08",
        cardExpiryDate: "28",
        cvvCode: "1234",
        cardName: "Sabby De Leon",
        couponCode: "rahulshettyacademy",
        expectedCouponMessage: "* Coupon Applied",
        initialCountryInput: "Ind",
        expectedCountryOutput: " Indonesia",
        expectedThankYouMessage: " Thankyou for the order. ",
        expectedOrderSummaryPageTitle: " order summary "
}
    
}

)