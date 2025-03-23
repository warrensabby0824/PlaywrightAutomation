class LoginPage {

    constructor(page) {
    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.userNameInputField = page.locator("#userEmail");
    this.passwordInputField = page.locator("#userPassword");

    }

async goToLoginPage(){

    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(userEmail,userPassword) {
    await this.userNameInputField.fill(userEmail);
    await this.passwordInputField.fill(userPassword);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
    }


}
module.exports = {LoginPage};
