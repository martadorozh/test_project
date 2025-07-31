import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import helper from '../helpers/helper.js';

describe('TC_problem_user - Inventory issues', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('problem_user', 'secret_sauce');
        await inventoryPage.open();
    });

    it('should login and show products with problem_user display issues', async () => {
        await helper.verifyUrlContains('inventory.html');

        const productsCount = await inventoryPage.inventoryItems.length;
        expect(productsCount).toBeGreaterThan(0);

        const images = await browser.$$('[class="inventory_item_img"] img');
        const problemImages = [];

        for (const img of images) {
            const src = await img.getAttribute('src');
            if (src.includes('sl-404')) {
                problemImages.push(src);
            }
        }

        expect(problemImages.length).toBeGreaterThan(0);
    });
});

