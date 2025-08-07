import loginPage from '../pageobjects/login.page.js';
import helper from '../helpers/helper.js';

describe('TC03 - Login with Invalid Username', () => {
    it('should not log in with incorrect username and display error', async () => {
        await loginPage.open();
        await loginPage.login('standarD_user', 'secret_sauce');

        await loginPage.verifyErrorIsVisibleWithText('Epic sadface: Username and password do not match any user in this service');

        await helper.verifyFieldHighlighted(loginPage.inputUsername);
        await helper.verifyFieldHighlighted(loginPage.inputPassword);
        await helper.verifyXIconsCount(2);
    });
});
