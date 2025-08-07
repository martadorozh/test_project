import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('TC06 - Sorting Products', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should sort products by all available options', async () => {
        await inventoryPage.testSortingOptions();
    });
});

