import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';

describe('TC - Error User Checkout Flow', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('error_user', 'secret_sauce');
        await browser.pause(1000);
    });

    it('should get stuck on checkout-step-one.html due to broken flow', async () => {
        await InventoryPage.addFirstProductToCart();
        await InventoryPage.goToCart();
        await CartPage.clickCheckout();
        await CheckoutPage.fillCheckoutForm('Test', 'Error', '00000');

        const currentUrl = await browser.getUrl();
        // Очікуємо, що користувач не перейде на наступний крок
        expect(currentUrl).toContain('checkout-step-one.html');
    });
});

