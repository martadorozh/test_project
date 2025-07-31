import loginPage from '../pageobjects/login.page.js';
import productsPage from '../pageobjects/products.page.js';
import helper from '../helpers/helper.js';

describe('TC - Visual User UI Check', () => {
    it('should detect broken product image', async () => {
        await loginPage.open();
        await loginPage.login('visual_user', 'secret_sauce');
        await helper.verifyUrlContains('inventory.html');

        const images = await productsPage.productImages;

        for (const img of images) {
            const naturalWidth = await img.getProperty('naturalWidth');
            const naturalHeight = await img.getProperty('naturalHeight');

            expect(naturalWidth).toBeGreaterThan(0);
            expect(naturalHeight).toBeGreaterThan(0);
        }
    });
});

