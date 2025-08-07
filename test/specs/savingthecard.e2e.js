import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import helper from '../helpers/helper.js';

describe('TC05 - Saving the cart after logout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should preserve cart items after logout and login', async () => {
        await inventoryPage.addFirstProductToCart();

        await inventoryPage.verifyCartBadgeCount(1);

        await inventoryPage.openMenu();
        await inventoryPage.verifyMenuItemsCount(4);
        await inventoryPage.logout();

        await helper.verifyUrlContains('saucedemo.com');
        await helper.verifyElementVisible(loginPage.inputUsername);
        await loginPage.verifyLoginFieldsEmpty();

        await loginPage.login('standard_user', 'secret_sauce');
        await helper.verifyUrlContains('inventory.html');
        await helper.verifyElementVisible(inventoryPage.cartButton);
        await inventoryPage.verifyInventoryItemsCountIsGreaterThan(0);

        await inventoryPage.goToCart();
        await helper.verifyUrlContains('cart.html');

        await helper.verifyElementCountEquals(cartPage.cartItems, 1);

        await helper.verifyCartItemNameByIndex(cartPage, 0, 'Sauce Labs Backpack');
    });
});
