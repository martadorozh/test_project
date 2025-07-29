import Page from './page.js';

class LoginPage extends Page {
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('#login-button'); }
    get errorMessage() { return $('[data-test="error"]'); }

    async login(username, password) {
        await this.inputUsername.waitForDisplayed();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async isOnLoginPage() {
        return await this.inputUsername.isDisplayed();
    }

    open() {
        return super.open('https://www.saucedemo.com');
    }
}

export default new LoginPage();
