import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';
import helper from '../helpers/helper.js';

describe('TC - Error User Checkout Flow', () => {

    before(async () => {
        await loginPage.open();
        await loginPage.login('error_user', 'secret_sauce');
    });

    it('should get stuck on checkout-step-one.html due to broken flow', async () => {
        await inventoryPage.addFirstProductToCart();
        await inventoryPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.fillCheckoutForm('Test', 'Error', '00000');

        await helper.verifyUrlContains('checkout-step-one.html');
    });
});