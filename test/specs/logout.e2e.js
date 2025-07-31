import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import helper from '../helpers/helper.js';

describe('TC04 - Logout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.pause(1000);
    });

    it('should logout user and redirect to login page', async () => {
        await inventoryPage.clickElement(inventoryPage.menuButton);
        await inventoryPage.pause(700);

        const menuItems = await inventoryPage.menuItems;
        expect(menuItems.length).toBe(4);

        await inventoryPage.clickElement(inventoryPage.logoutButton);
        await inventoryPage.pause(1000);

        await helper.verifyUrlContains('saucedemo.com');
        await helper.verifyElementVisible(loginPage.inputUsername);

        const usernameValue = await loginPage.inputUsername.getValue();
        const passwordValue = await loginPage.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');
    });
});
