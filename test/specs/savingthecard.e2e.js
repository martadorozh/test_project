import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import helper from '../helpers/helper.js';

describe('TC05 - Saving the cart after logout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.pause(1000);
    });

    it('should preserve cart items after logout and login', async () => {
        await inventoryPage.addFirstProductToCart();
        await inventoryPage.pause(1000);

        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe(1);

        await inventoryPage.clickElement(inventoryPage.menuButton);
        await inventoryPage.pause(700);

        const menuItems = await inventoryPage.menuItems;
        expect(menuItems.length).toBe(4);

        await inventoryPage.clickElement(inventoryPage.logoutButton);
        await inventoryPage.pause(1000);

        await helper.verifyUrlContains('saucedemo.com');
        await helper.verifyElementVisible(loginPage.inputUsername);

        const usernameVal = await loginPage.inputUsername.getValue();
        const passwordVal = await loginPage.inputPassword.getValue();
        expect(usernameVal).toBe('');
        expect(passwordVal).toBe('');

        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.pause(1000);

        await helper.verifyUrlContains('inventory.html');

        const items = await inventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);
        await helper.verifyElementVisible(inventoryPage.cartButton);

        await inventoryPage.goToCart();
        await inventoryPage.pause(1000);

        await helper.verifyUrlContains('cart.html');

        const cartItems = await cartPage.cartItems;
        expect(cartItems.length).toBe(1);

        const cartItem = await $('[data-test="inventory-item-name"]');
        await helper.verifyTextEquals(cartItem, 'Sauce Labs Backpack');
    });
});

