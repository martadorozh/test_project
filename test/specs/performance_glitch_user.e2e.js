import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('TC_performance_glitch_user - Slow performance check', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('performance_glitch_user', 'secret_sauce');
    });

    it('should login successfully and display inventory with delay', async () => {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            {
                timeout: 10000,
                timeoutMsg: 'Inventory page did not load within expected time'
            }
        );

        await inventoryPage.pause(2000);

        const items = await inventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);
    });
});
