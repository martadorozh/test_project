import LoginPage from '../pageobjects/login.page.js';

describe('TC03 - Login with Invalid Username', () => {
    it('should not log in with incorrect username and display error', async () => {
        // Відкриваємо сторінку логіну
        await LoginPage.open();
        await browser.pause(1000);

        // Вводимо невалідний логін
        await LoginPage.inputUsername.setValue('standarD_user'); // помилковий username
        await browser.pause(700);
        const enteredUsername = await LoginPage.inputUsername.getValue();
        expect(enteredUsername).toBe('standarD_user');

        // Вводимо валідний пароль
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(700);
        const passwordType = await LoginPage.inputPassword.getAttribute('type');
        expect(passwordType).toBe('password'); // поле маскує пароль

        // Клікаємо кнопку логіну
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);


        // Перевіряємо, що з’явилось повідомлення про помилку
        const error = await LoginPage.errorMessage;
        expect(await error.isDisplayed()).toBe(true);

        const errorText = await error.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

        // Перевіряємо, що поля підсвічені червоним і з’явились X-іконки
        const usernameClass = await LoginPage.inputUsername.getAttribute('class');
        const passwordClass = await LoginPage.inputPassword.getAttribute('class');
        expect(usernameClass).toContain('input_error');
        expect(passwordClass).toContain('input_error');

        const xIcons = await $$('svg[data-icon="times-circle"]');
        expect(xIcons.length).toBe(2);
    });
});
