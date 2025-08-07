// tests/visual-ui-check.e2e.js

import loginPage from '../pageobjects/login.page.js';
import productsPage from '../pageobjects/products.page.js';
import helper from '../helpers/helper.js';

describe('TC09 - Visual User UI Check', () => {
    it('should display all product images correctly', async () => {
        await loginPage.open();
        await loginPage.login('visual_user', 'secret_sauce');
        await helper.verifyUrlContains('inventory.html');

        await productsPage.verifyAllProductImagesAreDisplayed();
    });
});
