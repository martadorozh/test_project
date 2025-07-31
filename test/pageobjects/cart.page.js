import Page from './page.js';

class CartPage extends Page {
    get cartItems() { return $$('div.cart_item'); }
    get checkoutBtn() { return $('button[data-test="checkout"]'); }
    get errorMessage() { return $('[data-test="error"]'); }

    async clickCheckout() {
        await this.clickElement(this.checkoutBtn);
    }

    async getCartItemsCount() {
        return this.cartItems.length;
    }

    async open() {
        await super.open('cart.html');
    }
}

export default new CartPage();

