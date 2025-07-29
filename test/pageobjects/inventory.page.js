import Page from './page.js';

class InventoryPage extends Page {
    get firstAddToCartButton() {
        return $('button[data-test="add-to-cart-sauce-labs-backpack"]');
    }

    get cartButton() {
        return $('.shopping_cart_link');
    }

    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    get inventoryItems() {
        return $$('.inventory_item');
    }

    get menuButton() {
    return $('#react-burger-menu-btn');
    }

    get logoutButton() {
    return $('#logout_sidebar_link');
    }

    get menuItems() {
    return $$('.bm-item-list a');
    }

    get firstProductPrice() {
        return $('[data-test="inventory-item-price"]');
    }

    get sortDropdown() {
        return $('.product_sort_container');
    }

    async open() {
        await super.open('inventory.html');
    }

    async addFirstProductToCart() {
        await this.firstAddToCartButton.waitForClickable();
        await this.firstAddToCartButton.click();
    }

    async goToCart() {
        await this.cartButton.waitForClickable();
        await this.cartButton.click();
    }

    async getCartBadgeCount() {
        if(await this.cartBadge.isExisting()) {
            const text = await this.cartBadge.getText();
            return parseInt(text);
        }
        return 0;
    }

    async getFirstProductPriceValue() {
        const priceText = await this.firstProductPrice.getText(); 
        return parseFloat(priceText.replace('$', ''));
    }

    async selectSorting(value) {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.selectByAttribute('value', value);
    }

    async getAllProductPrices() {
        const priceElements = await browser.$$('[data-test="inventory-item-price"]');

        const prices = await Promise.all(
            Array.from(priceElements).map(async (el) => {
                const text = await el.getText();
                return parseFloat(text.replace('$', ''));
            })
        );

        return prices;
    }

    async getAllProductNames() {
        const nameElements = await browser.$$('[data-test="inventory-item-name"]');
        const names = [];
        for (const el of nameElements) {
            names.push(await el.getText());
        }
        return names;
    }

    async getFirstProductName() {
        const el = await browser.$('[data-test="inventory-item-name"]');
        return await el.getText();
    }
}

export default new InventoryPage();
