import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('TC05 - Saving the cart after logout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(1000);
        const url = await browser.getUrl();
        expect(url).toContain('inventory.html');
    });

    it('should preserve cart items after logout and login', async () => {
        // Додаємо товар у корзину
        await InventoryPage.addFirstProductToCart();
        await browser.pause(1000);

        const badgeCount = await InventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe(1);

        // Клікаємо на бургер-меню
        await InventoryPage.menuButton.click();
        await browser.pause(700);

        // Перевіряємо, що меню розгорнулося і має 4 пункти
        const menuItems = await InventoryPage.menuItems;
        expect(menuItems.length).toBe(4);

        // Клікаємо Logout
        await InventoryPage.logoutButton.click();
        await browser.pause(1000);
        const loginUrl = await browser.getUrl();
        expect(loginUrl).toContain('saucedemo.com');

        const isUsernameVisible = await LoginPage.inputUsername.isDisplayed();
        expect(isUsernameVisible).toBe(true);

        // Перевірка, що поля порожні
        const usernameVal = await LoginPage.inputUsername.getValue();
        const passwordVal = await LoginPage.inputPassword.getValue();
        expect(usernameVal).toBe('');
        expect(passwordVal).toBe('');

        // Знову логінимося
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(1000);
        const afterLoginUrl = await browser.getUrl();
        expect(afterLoginUrl).toContain('inventory.html');

        // Перевіряємо, що товари завантажились
        const items = await InventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);

        // Перевіряємо, що кнопка корзини відображається
        const cartVisible = await InventoryPage.cartButton.isDisplayed();
        expect(cartVisible).toBe(true);

        // Переходимо в корзину
        await InventoryPage.goToCart();
        await browser.pause(1000);
        const cartUrl = await browser.getUrl();
        expect(cartUrl).toContain('cart.html');

        // Перевіряємо, що на сторінці корзини є 1 товар
        const cartItems = await CartPage.cartItems;
        expect(cartItems.length).toBe(1);

        const cartItem = await $('[data-test="inventory-item-name"]');
        expect(await cartItem.getText()).toBe('Sauce Labs Backpack');
    });
});
