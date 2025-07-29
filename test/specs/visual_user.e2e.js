import ProductsPage from '../pageobjects/products.page.js';

describe('TC - Visual User UI Check', () => {
    it('should detect broken product image', async () => {
        await browser.url('https://www.saucedemo.com');
        
        // Логін користувача visual_user
        await $('#user-name').setValue('visual_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Переконуємось, що ми на сторінці продуктів
        const url = await browser.getUrl();
        expect(url).toContain('inventory.html');

        // Отримуємо всі картинки продуктів
        const images = await ProductsPage.productImages;

        for (const img of images) {
            // Перевіряємо, що зображення відкрилось без помилки
            // Наприклад, перевірка що width і height не 0
            const naturalWidth = await img.getProperty('naturalWidth');
            const naturalHeight = await img.getProperty('naturalHeight');

            expect(naturalWidth).toBeGreaterThan(0);
            expect(naturalHeight).toBeGreaterThan(0);
        }
    });
});
