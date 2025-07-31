import loginPage from '../pageobjects/login.page.js';
import helper from '../helpers/helper.js';

describe('TC_locked_out_user - Login locked out user', () => {
    before(async () => {
        await loginPage.open();
    });

    it('should not allow locked_out_user to login and show error message', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');

        await helper.verifyUrlContains('saucedemo.com');
        await helper.verifyElementVisible(loginPage.errorMessage);
        await helper.verifyTextContains(loginPage.errorMessage, 'Sorry, this user has been locked out.');
    });
});
