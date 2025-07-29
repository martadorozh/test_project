import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import CompletePage from '../pageobjects/complete.page.js';

describe('TC08 - Valid Checkout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(1000);
        const url = await browser.getUrl();
        expect(url).toContain('inventory.html'); // Перевірка, що ми на потрібній сторінці
    });

    it('should complete the checkout process successfully', async () => {
        //  Додаємо товар у корзину
        const itemPrice = await InventoryPage.getFirstProductPriceValue();
        await InventoryPage.addFirstProductToCart();
        const count = await InventoryPage.getCartBadgeCount();
        expect(count).toBe(1);
        await browser.pause(1000);

        //  Переходимо в корзину
        await InventoryPage.goToCart();
        await browser.pause(500);
        const cartUrl = await browser.getUrl();
        expect(cartUrl).toContain('cart.html');

        const cartItem = await $('[data-test="inventory-item-name"]');
        expect(await cartItem.getText()).toBe('Sauce Labs Backpack');

        //  В корзині клікаємо Checkout
        await CartPage.clickCheckout();
        await browser.pause(500);

        // Заповнюємо форму
        await CheckoutPage.fillCheckoutForm('Marta', 'Dorozhovets', '12345');
        await expect(await CheckoutPage.firstNameInput.getValue()).toBe('Marta');
        await expect(await CheckoutPage.lastNameInput.getValue()).toBe('Dorozhovets');
        await expect(await CheckoutPage.postalCodeInput.getValue()).toBe('12345');
        await CheckoutPage.clickContinue();
        await browser.pause(1000);

        const overviewUrl = await browser.getUrl();
        expect(overviewUrl).toContain('checkout-step-two.html');

        const itemName = await $('[data-test="inventory-item-name"]');
        expect(await itemName.getText()).toBe('Sauce Labs Backpack');

        // Перевіряємо Total і Tax
        const totalText = await $('[data-test="total-label"]').getText();
        const taxText = await $('[data-test="tax-label"]').getText();

        const total = parseFloat(totalText.replace('Total: $', ''));
        const tax = parseFloat(taxText.replace('Tax: $', ''));

        expect(total).toBeCloseTo(itemPrice + tax, 2);

        // Завершуємо оформлення
        await CheckoutPage.clickFinish();
        await browser.pause(1000);
        const completeUrl = await browser.getUrl();
        expect(completeUrl).toContain('checkout-complete.html');

        // Перевіряємо, що відображається повідомлення "Thank you for your order!"
        await CompletePage.verifyCompleteMessage();
        await browser.pause(1000);

        // Натискаємо "Back Home" щоб повернутися на головну сторінку
        await CompletePage.clickBackHome();
        await browser.pause(500);

        // Перевіряємо, що URL містить inventory.html (головна сторінка)
        const url = await browser.getUrl();
        expect(url).toContain('inventory.html');
        await browser.pause(500);

        // Перевірка, що товари є
        const items = await InventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);

        const cartCount = await InventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(0);

   });
});
