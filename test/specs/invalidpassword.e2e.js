import loginPage from '../pageobjects/login.page.js';
import helper from '../helpers/helper.js';

describe('TC02 - Login with Invalid Password', () => {
    it('should not log in with incorrect password and display error', async () => {
        await loginPage.open();

        await loginPage.login('standard_user', 'wrong_password');

        await helper.verifyInputValue(loginPage.inputUsername, 'standard_user');
        await loginPage.verifyPasswordFieldType();

        await loginPage.verifyErrorIsVisibleWithText('Epic sadface: Username and password do not match any user in this service');

        await helper.verifyFieldHighlighted(loginPage.inputUsername);
        await helper.verifyFieldHighlighted(loginPage.inputPassword);
        await helper.verifyXIconsCount(2);
    });
});
