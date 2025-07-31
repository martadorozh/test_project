import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import helper from '../helpers/helper.js';

describe('TC09 - Checkout without products', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.open();
    });

    it('should handle checkout attempt with empty cart', async () => {
        await inventoryPage.goToCart();
        await cartPage.pause(2000);

        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBe(0);
        await cartPage.pause(2000);

        await cartPage.clickCheckout();
        await cartPage.pause(2000);

        await helper.verifyUrlContains('checkout-step-one.html');
    });
});