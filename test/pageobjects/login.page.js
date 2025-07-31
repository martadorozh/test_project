import Page from './page.js';

class LoginPage extends Page {
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('#login-button'); }
    get errorMessage() { return $('[data-test="error"]'); }

    async login(username, password) {
        await this.setValue(this.inputUsername, username);
        await this.setValue(this.inputPassword, password);
        await this.clickElement(this.btnSubmit);
    }

    async isOnLoginPage() {
        return this.isDisplayed(this.inputUsername);
    }

    async getErrorMessageText() {
        return this.getText(this.errorMessage);
    }

    open() {
        return super.open('https://www.saucedemo.com');
    }
}

export default new LoginPage();
