import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('TC01 - Valid Login Test', () => {
    it('should log in and redirect to inventory page', async () => {
        // Відкриваємо сторінку логіну
        await LoginPage.open();
        await browser.pause(1000);

        // Вводимо логін
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(700);
        const enteredUsername = await LoginPage.inputUsername.getValue();
        expect(enteredUsername).toBe('standard_user');

        // Вводимо пароль
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(700);
        const passwordType = await LoginPage.inputPassword.getAttribute('type');
        expect(passwordType).toBe('password'); // пароль ховається

        // Клікаємо кнопку логіну
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);

        // Перевіряємо, що URL змінився на inventory
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // Перевіряємо, що товари завантажились
        const items = await InventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);

        // Перевіряємо, що кнопка корзини відображається
        const cartVisible = await InventoryPage.cartButton.isDisplayed();
        expect(cartVisible).toBe(true);
    });
});
