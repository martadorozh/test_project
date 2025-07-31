import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';
import completePage from '../pageobjects/complete.page.js';
import helper from '../helpers/helper.js';

describe('TC08 - Valid Checkout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.pause(1000);
    });

    it('should complete the checkout process successfully', async () => {
        const itemPrice = await inventoryPage.getFirstProductPriceValue();
        await inventoryPage.addFirstProductToCart();

        const count = await inventoryPage.getCartBadgeCount();
        expect(count).toBe(1);
        await inventoryPage.pause(1000);

        await inventoryPage.goToCart();
        await inventoryPage.pause(500);
        await helper.verifyUrlContains('cart.html');

        const cartItem = await $('[data-test="inventory-item-name"]');
        await helper.verifyTextEquals(cartItem, 'Sauce Labs Backpack');

        await cartPage.clickCheckout();
        await cartPage.pause(500);

        await checkoutPage.fillCheckoutForm('Marta', 'Dorozhovets', '12345');
        await helper.verifyInputValue(checkoutPage.firstNameInput, 'Marta');
        await helper.verifyInputValue(checkoutPage.lastNameInput, 'Dorozhovets');
        await helper.verifyInputValue(checkoutPage.postalCodeInput, '12345');

        await checkoutPage.clickContinue();
        await checkoutPage.pause(1000);

        await helper.verifyUrlContains('checkout-step-two.html');

        const itemName = await $('[data-test="inventory-item-name"]');
        await helper.verifyTextEquals(itemName, 'Sauce Labs Backpack');

        const totalText = await $('[data-test="total-label"]').getText();
        const taxText = await $('[data-test="tax-label"]').getText();

        const total = parseFloat(totalText.replace('Total: $', ''));
        const tax = parseFloat(taxText.replace('Tax: $', ''));

        expect(total).toBeCloseTo(itemPrice + tax, 2);

        await checkoutPage.clickFinish();
        await checkoutPage.pause(1000);

        await helper.verifyUrlContains('checkout-complete.html');
        await completePage.verifyCompleteMessage();
        await completePage.pause(1000);

        await completePage.clickBackHome();
        await completePage.pause(500);

        await helper.verifyUrlContains('inventory.html');

        const items = await inventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);

        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe(0);
    });
});
