class APIUtils
{
    constructor(apiContext)
    {
        this.apiContext = apiContext;
    }
    
    async getToken(loginPayLoad)
    {
        const loginResponseAPI = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data:loginPayLoad
            });
        const loginResponseJson = await loginResponseAPI.json();
        const loginResponseToken = loginResponseJson.token;
        console.log(loginResponseToken);
        return loginResponseToken;
    }

    async createOrder(orderCreationPayLoad,token)
    {
        const orderCreationAPI = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
                data:orderCreationPayLoad,
                headers:{
                    ["Authorization"]:token,
                    ["Content-Type"]:"application/json" 
                },
            });
        const orderCreationResponseJson = await orderCreationAPI.json();
        console.log(orderCreationResponseJson);
        const orderCreationIDNumber = orderCreationResponseJson.orders[0];
        return orderCreationIDNumber;
    }
    
    
    
    // constructor(apiContext,loginPayLoad)
    // {
    //     this.apiContext = apiContext;
    //     this.loginPayLoad = loginPayLoad;
    // }
    
    // async getToken()
    // {
    //     const loginResponseAPI = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    //         {
    //             data:this.loginPayLoad
    //         });
    //     const loginResponseJson = await loginResponseAPI.json();
    //     const loginResponseToken = loginResponseJson.token;
    //     console.log(loginResponseToken);
    //     return loginResponseToken;
    // }

    // async createOrder(orderCreationPayLoad)
    // {

    //     let response = {};
    //     response.token = await this.getToken();
    //     const orderCreationAPI = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
    //         {
    //             data:orderCreationPayLoad,
    //             headers:{
    //                 ["Authorization"]:response.token,
    //                 ["Content-Type"]:"application/json" 
    //             },
    //         });
    //     const orderCreationResponseJson = await orderCreationAPI.json();
    //     const orderCreationIDNumber = orderCreationResponseJson.orders[0];
    //     response.orderID = orderCreationIDNumber;
    //     console.log(orderCreationIDNumber)    
    //     return response;
    // }

}

module.exports = {APIUtils};