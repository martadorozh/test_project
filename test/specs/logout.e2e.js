import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import helper from '../helpers/helper.js';

describe('TC04 - Logout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should logout user and redirect to login page', async () => {
        await inventoryPage.openMenu();
        await inventoryPage.verifyMenuItemsCount(4);
        await inventoryPage.logout();

        await helper.verifyUrlContains('saucedemo.com');
        await loginPage.verifyLoginFieldsEmpty();
    });
});
