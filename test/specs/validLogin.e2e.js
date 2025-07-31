import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import helper from '../helpers/helper.js';

describe('TC01 - Valid Login Test', () => {
    it('should log in and redirect to inventory page', async () => {
        await loginPage.open();
        await loginPage.pause(1000);

        await loginPage.setValue(loginPage.inputUsername, 'standard_user');
        await loginPage.pause(700);
        await helper.verifyInputValue(loginPage.inputUsername, 'standard_user');

        await loginPage.setValue(loginPage.inputPassword, 'secret_sauce');
        await loginPage.pause(700);
        const passwordType = await loginPage.inputPassword.getAttribute('type');
        expect(passwordType).toBe('password');

        await loginPage.clickElement(loginPage.btnSubmit);
        await loginPage.pause(1000);

        await helper.verifyUrlContains('inventory.html');

        const items = await inventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);

        await helper.verifyElementVisible(inventoryPage.cartButton);
    });
});
