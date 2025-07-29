import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('TC04 - Logout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(1000);
        const url = await browser.getUrl();
        expect(url).toContain('inventory.html');
    });

    it('should logout user and redirect to login page', async () => {
        // Клікаємо на бургер-меню
        await InventoryPage.menuButton.click();
        await browser.pause(700);

        // Перевірка, що меню розгорнулось з 4 пунктами
        const menuItems = await InventoryPage.menuItems;
        expect(menuItems.length).toBe(4);

        // Клікаємо Logout
        await InventoryPage.logoutButton.click();
        await browser.pause(1000);

        // Перевірка, що повернулись на сторінку логіну
        const loginUrl = await browser.getUrl();
        expect(loginUrl).toContain('saucedemo.com');

        const isLoginVisible = await LoginPage.inputUsername.isDisplayed();
        expect(isLoginVisible).toBe(true);

        // Перевірка, що поля порожні
        const usernameValue = await LoginPage.inputUsername.getValue();
        const passwordValue = await LoginPage.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');
    });
});
