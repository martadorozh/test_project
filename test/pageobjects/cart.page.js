import Page from './page.js';

class CartPage extends Page {
    get cartItems() { return $$('div.cart_item'); }
    get checkoutBtn() { return $('button[data-test="checkout"]'); }
    get errorMessage() { return $('[data-test="error"]'); }

    async clickCheckout() {
        await this.clickElement(this.checkoutBtn);
    }

    async getCartItemsCount() {
        const items = await this.cartItems;
        return items.length;
    }

    async verifyCartIsEmpty() {
        const count = await this.getCartItemsCount();
        expect(count).toBe(0);
    }

    async getItemNameByIndex(index) {
        return this.cartItems[index].$('div.inventory_item_name');
    }

    async open() {
        await super.open('cart.html');
    }
}

export default new CartPage();

