import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import helper from '../helpers/helper.js';

describe('TC_problem_user - Inventory issues', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('problem_user', 'secret_sauce');
    });

    it('should login and show products with problem_user display issues', async () => {
        await helper.verifyUrlContains('inventory.html');

        await inventoryPage.verifyInventoryItemsCountIsGreaterThan(0);

        await inventoryPage.verifyBrokenImagesExist();
    });
});

