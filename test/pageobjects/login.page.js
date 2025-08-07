import Page from './page.js';

class LoginPage extends Page {
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('#login-button'); }
    get errorMessage() { return $('[data-test="error"]'); }

    open() {
        return super.open('');
    }

    async login(username, password) {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.submit();
    }

    async setUsername(username) {
        await this.setValue(this.inputUsername, username);
    }

    async getUsername() {
        return await this.inputUsername.getValue();
    }

    async setPassword(password) {
        await this.setValue(this.inputPassword, password);
    }

    async getPasswordType() {
        return await this.getAttribute(this.inputPassword, 'type');
    }

    async verifyPasswordFieldType(expectedType = 'password') {
        const actualType = await this.getPasswordType();
        expect(actualType).toBe(expectedType);
    }

    async verifyErrorIsVisibleWithText(expectedText) {
        const isVisible = await this.isErrorVisible();
        expect(isVisible).toBe(true);

        const actualText = await this.getErrorMessageText();
        expect(actualText).toBe(expectedText);
    }

    async submit() {
        await this.clickElement(this.btnSubmit);
    }

    async isOnLoginPage() {
        return this.isDisplayed(this.inputUsername);
    }

    async getErrorMessageText() {
        return await this.getText(this.errorMessage);
    }

    async isErrorVisible() {
        return await this.isDisplayed(this.errorMessage);
    }

    async verifyErrorMessage(expectedText) {
        const isVisible = await this.isErrorVisible();
        if (!isVisible) {
            throw new Error('Error message is not visible');
        }

        const actualText = await this.getErrorMessageText();
        if (actualText !== expectedText) {
            throw new Error(`Expected error message "${expectedText}", but got "${actualText}"`);
        }
    }

    async verifyLoginFieldsEmpty() {
        await this.inputUsername.waitForDisplayed();
        const usernameValue = await this.inputUsername.getValue();
        const passwordValue = await this.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');
    }
}

export default new LoginPage();