import LoginPage from '../pageobjects/login.page.js';

describe('TC02 - Login with Invalid Password', () => {
    it('should not log in with incorrect password and display error', async () => {
        // Відкриваємо сторінку логіну
        await LoginPage.open();
        await browser.pause(1000);

        // Вводимо валідний логін
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(700);
        const enteredUsername = await LoginPage.inputUsername.getValue();
        expect(enteredUsername).toBe('standard_user');

        // Вводимо невалідний пароль
        await LoginPage.inputPassword.setValue('wrong_password');
        await browser.pause(700);
        const passwordType = await LoginPage.inputPassword.getAttribute('type');
        expect(passwordType).toBe('password'); // поле маскує пароль

        // Клікаємо кнопку логіну
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);

        // Перевіряємо, що логін не вдалий — залишаємося на тій самій сторінці
        const url = await browser.getUrl();
        expect(url).toContain('saucedemo.com'); // не inventory.html

        // Перевіряємо, що з'явилась помилка
        const error = await $('.error-message-container');
        expect(await error.isDisplayed()).toBe(true);

        // Перевірка тексту помилки
        const errorText = await error.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match');

        // Перевірка, що поля мають червоне підсвічування та хрестики
        const usernameClass = await LoginPage.inputUsername.getAttribute('class');
        const passwordClass = await LoginPage.inputPassword.getAttribute('class');
        expect(usernameClass).toContain('input_error');
        expect(passwordClass).toContain('input_error');

        const xIcons = await $$('svg[data-icon="times-circle"]');
        expect(xIcons.length).toBe(2); // має бути 2 іконки X
    });
});
