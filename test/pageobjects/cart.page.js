import Page from './page.js';

class CartPage extends Page {
    get cartItems() { 
        return $$('div.cart_item'); 
    }

    get cartItemNames() {
        return $$('[data-test="inventory-item-name"]');
    }

    get checkoutBtn() { 
        return $('button[data-test="checkout"]'); 
    }

    get errorMessage() {
        return $('[data-test="error"]');
    }

    async open() {
        await super.open('cart.html');
    }

    async clickCheckout() {
        await this.checkoutBtn.waitForClickable();
        await this.checkoutBtn.click();
    }

    async getCartItemsCount() {
        const items = await this.cartItems;
        return this.cartItems.length;
    }
}

export default new CartPage();
