import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('TC_problem_user - Inventory issues', () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login('problem_user', 'secret_sauce');
    await InventoryPage.open();
  });

  it('should login and show products with problem_user display issues', async () => {
    expect(await browser.getUrl()).toContain('inventory.html');

    // Перевіряємо, що продукти відображаються (їх має бути більше 0)
    const productsCount = await InventoryPage.inventoryItems.length;
    expect(productsCount).toBeGreaterThan(0);

    // Перевіряємо, що картинки мають "sl-404" в атрибуті src — ознака проблемного користувача
    const images = await browser.$$('[class="inventory_item_img"] img');
    const problemImages = [];

    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src.includes('sl-404')) {
        problemImages.push(src);
      }
    }

    expect(problemImages.length).toBeGreaterThan(0);
  });
});
