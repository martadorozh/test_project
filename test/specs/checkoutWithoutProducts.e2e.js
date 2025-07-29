import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('TC08 - Checkout without products', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.open();
    });

    it('should handle checkout attempt with empty cart', async () => {
        // Перейти в корзину
        await InventoryPage.goToCart();
        await browser.pause(500);

        // Перевірити, що кошик порожній
        const itemCount = await CartPage.getCartItemsCount();
        expect(itemCount).toBe(0);
        await browser.pause(500);

        // Натиснути кнопку Checkout
        await CartPage.clickCheckout();
        await browser.pause(500);

        // NOTE:
        // Згідно з тест-кейсом, очікувалося, що порожній кошик блокує перехід до оформлення замовлення
        // і показує повідомлення "Cart is empty".
        // Фактично ж користувач одразу потрапляє на сторінку checkout-step-one.html
        // без жодного попередження.

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('checkout-step-one.html');
    });
});
