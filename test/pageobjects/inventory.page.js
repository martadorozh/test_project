import Page from './page.js';

class InventoryPage extends Page {
    get firstAddToCartButton() { return $('button[data-test="add-to-cart-sauce-labs-backpack"]'); }
    get cartButton() { return $('.shopping_cart_link'); }
    get cartBadge() { return $('.shopping_cart_badge'); }
    get inventoryItems() { return $$('.inventory_item'); }
    get firstProductPrice() { return $('[data-test="inventory-item-price"]'); }
    get sortSelect() { return $('[data-test="product-sort-container"]'); }
    get menuButton() { return $('#react-burger-menu-btn'); }
    get menuItems() { return $$('.bm-item-list a'); }
    get logoutButton() { return $('#logout_sidebar_link'); }


    get firstProductName() {
        return $('[data-test="inventory-item-name"]');
    }

    async addFirstProductToCart() {
        await this.clickElement(this.firstAddToCartButton);
    }

    async goToCart() {
        await this.clickElement(this.cartButton);
    }

    async getCartBadgeCount() {
        if (await this.isDisplayed(this.cartBadge)) {
            const text = await this.getText(this.cartBadge);
            return parseInt(text);
        }
        return 0;
    }

    async getFirstProductPriceValue() {
        const priceText = await this.getText(this.firstProductPrice);
        return parseFloat(priceText.replace('$', ''));
    }

    async getInventoryItemsCount() {
        return this.inventoryItems.length;
    }

    async open() {
        await super.open('inventory.html');
    }

    async getFirstProductName() {
        await this.firstProductName.waitForDisplayed();
        return await this.firstProductName.getText();
    }

    async selectSorting(value) {
        await this.setValue(this.sortSelect, value);
    }

    async getAllProductPrices() {
        const priceElements = await $$('[data-test="inventory-item-price"]');
        const prices = [];
        for (const el of priceElements) {
            const priceText = await el.getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async getAllProductNames() {
        const nameElements = await $$('[data-test="inventory-item-name"]');
        const names = [];
        for (const el of nameElements) {
            names.push(await el.getText());
        }
        return names;
    }
}

export default new InventoryPage();

