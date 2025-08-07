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
    });

    it('should complete the checkout process successfully', async () => {
        const itemPrice = await inventoryPage.addFirstProductToCartAndGetPrice();
        await inventoryPage.verifyCartBadgeCount(1);

        await inventoryPage.goToCart();
        await helper.verifyUrlContains('cart.html');
        await helper.verifyTextEquals(checkoutPage.itemName, 'Sauce Labs Backpack');

        await cartPage.clickCheckout();

        await checkoutPage.fillCheckoutForm('Marta', 'Dorozhovets', '12345');
        await helper.verifyInputValue(checkoutPage.firstNameInput, 'Marta');
        await helper.verifyInputValue(checkoutPage.lastNameInput, 'Dorozhovets');
        await helper.verifyInputValue(checkoutPage.postalCodeInput, '12345');

        await checkoutPage.clickContinue();
        await helper.verifyUrlContains('checkout-step-two.html');

        await helper.verifyTextEquals(checkoutPage.itemName, 'Sauce Labs Backpack');
        await checkoutPage.verifyTotalWithTax(itemPrice);

        await checkoutPage.clickFinish();
        await helper.verifyUrlContains('checkout-complete.html');
        await completePage.verifyCompleteMessage();

        await completePage.clickBackHome();
        await helper.verifyUrlContains('inventory.html');

        await inventoryPage.verifyInventoryItemsCountIsGreaterThan(0);
        await inventoryPage.verifyCartIsEmpty();
    });
});
