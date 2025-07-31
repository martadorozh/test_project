import loginPage from '../pageobjects/login.page.js';
import helper from '../helpers/helper.js';

describe('TC02 - Login with Invalid Password', () => {
    it('should not log in with incorrect password and display error', async () => {
        await loginPage.open();
        await loginPage.pause(1000);

        await loginPage.setValue(loginPage.inputUsername, 'standard_user');
        await loginPage.pause(700);
        await helper.verifyInputValue(loginPage.inputUsername, 'standard_user');

        await loginPage.setValue(loginPage.inputPassword, 'wrong_password');
        await loginPage.pause(700);
        const passwordType = await loginPage.inputPassword.getAttribute('type');
        expect(passwordType).toBe('password');

        await loginPage.clickElement(loginPage.btnSubmit);
        await loginPage.pause(1000);

        const error = await loginPage.errorMessage;
        await helper.verifyElementVisible(error);
        await helper.verifyTextContains(error, 'Epic sadface: Username and password do not match');

        await helper.verifyFieldHighlighted(loginPage.inputUsername);
        await helper.verifyFieldHighlighted(loginPage.inputPassword);
        await helper.verifyXIconsCount(2);
    });
});
