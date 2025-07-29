import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('TC_performance_glitch_user - Slow performance check', () => {

  before(async () => {
    await LoginPage.open();
    await LoginPage.login('performance_glitch_user', 'secret_sauce');
  });

  it('should login successfully and display inventory with delay', async () => {
    // Чекаємо, поки точно завантажиться сторінка інвентарю
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('inventory.html'),
      {
        timeout: 10000,
        timeoutMsg: 'Inventory page did not load within expected time'
      }
    );

    // Перевіряємо, що продукти відображаються (але даємо запас по часу)
    await browser.pause(2000); // Щоб було видно для перевірки вручну

    const items = await InventoryPage.inventoryItems;
    expect(items.length).toBeGreaterThan(0);
  });
});
