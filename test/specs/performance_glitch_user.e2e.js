import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import helper from '../helpers/helper.js';

describe('TC_performance_glitch_user - Slow performance check', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('performance_glitch_user', 'secret_sauce');
    });

    it('should login successfully and display inventory with delay', async () => {
        await helper.verifyUrlContains('inventory.html');

        await inventoryPage.verifyInventoryItemsCountIsGreaterThan(0);
    });
});
