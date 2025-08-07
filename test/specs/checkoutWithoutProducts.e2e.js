import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import helper from '../helpers/helper.js';

describe('TC09 - Checkout without products', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should handle checkout attempt with empty cart', async () => {
        await inventoryPage.goToCart();
        await helper.verifyUrlContains('cart.html');

        await cartPage.verifyCartIsEmpty()
        await cartPage.clickCheckout();

        await helper.verifyUrlContains('checkout-step-one.html');
    });
});