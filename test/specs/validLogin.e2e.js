import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import helper from '../helpers/helper.js';

describe('TC01 - Valid Login Test', () => {
    it('should log in and redirect to inventory page', async () => {
        await loginPage.open();

        await loginPage.login('standard_user', 'secret_sauce');

        await helper.verifyUrlContains('inventory.html');
        await inventoryPage.verifyInventoryItemsCountIsGreaterThan(0);
        await helper.verifyElementVisible(inventoryPage.cartButton);
    });
});
