import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('TC_locked_out_user - Login locked out user', () => {
  before(async () => {
    await LoginPage.open();
  });

  it('should not allow locked_out_user to login and show error message', async () => {
    await LoginPage.login('locked_out_user', 'secret_sauce');

    // Переконаємось, що залишились на сторінці логіну (адже вхід заборонений)
    expect(await browser.getUrl()).toContain('saucedemo.com');

    // Перевірка повідомлення про помилку
    await LoginPage.errorMessage.waitForDisplayed();
    const errorText = await LoginPage.errorMessage.getText();
    expect(errorText).toContain('Sorry, this user has been locked out.');
  });
});
