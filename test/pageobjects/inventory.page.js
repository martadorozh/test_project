import Page from './page.js';

export const sortingOptions = [
    { value: 'lohi', compare: (a, b) => a - b, type: 'price' },
    { value: 'hilo', compare: (a, b) => b - a, type: 'price' },
    { value: 'az',   compare: (a, b) => a.localeCompare(b), type: 'name' },
    { value: 'za',   compare: (a, b) => b.localeCompare(a), type: 'name' },
];

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
        return await this.getElementsCount(this.inventoryItems);
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

    async waitForValueChange(getter, previousValue) {
        await browser.waitUntil(
            async () => {
                const currentValue = await getter();
                return currentValue !== previousValue;
            },
            {
                timeout: 3000,
                timeoutMsg: 'expected value to change after sorting',
            }
        );
    }

    async verifySorted(type, compareFn) {
        if (type === 'price') {
            const prices = await this.getAllProductPrices();
            const sorted = [...prices].sort(compareFn);
            expect(prices).toEqual(sorted);
        } else if (type === 'name') {
            const names = await this.getAllProductNames();
            const sorted = [...names].sort(compareFn);
            expect(names).toEqual(sorted);
        } else {
            throw new Error(`Unsupported sorting type: ${type}`);
        }
    }

    async testSortingOptions() {
        for (const option of sortingOptions) {
            const previousFirstName = await this.getFirstProductName();

            await this.selectSorting(option.value);

            await this.waitForValueChange(() => this.getFirstProductName(), previousFirstName);

            await this.verifySorted(option.type, option.compare);
        }
    }

    async getAllProductPrices() {
        const elements = await $$('[data-test="inventory-item-price"]');
        const texts = await this.getElementsText(elements);
        return texts.map(t => parseFloat(t.replace('$', '')));
    }


    async getAllProductNames() {
        const elements = await $$('[data-test="inventory-item-name"]');
        return await this.getElementsText(elements);
    }


    async verifyCartBadgeCount(expectedCount) {
        const count = await this.getCartBadgeCount();
        expect(count).toBe(expectedCount);
    }

    async addFirstProductToCartAndGetPrice() {
        const price = await this.getFirstProductPriceValue();
        await this.addFirstProductToCart();
    return price;

    }

    async verifyInventoryItemsCountIsGreaterThan(count = 0) {
        const actualCount = await this.getInventoryItemsCount();
        expect(actualCount).toBeGreaterThan(count);
    }

    async verifyCartIsEmpty() {
        const cartCount = await this.getCartBadgeCount();
        expect(cartCount).toBe(0);
    }

    async openMenu() {
        await this.menuButton.waitForDisplayed();
        await this.clickElement(this.menuButton);
    }

    async verifyMenuItemsCount(expectedCount) {
        await browser.waitUntil(async () => (await this.menuItems.length) === expectedCount, {
            timeout: 5000,
            timeoutMsg: `Expected ${expectedCount} menu items but found different amount`
        });
        expect(await this.menuItems.length).toBe(expectedCount);
    }

    async logout() {
        await this.logoutButton.waitForDisplayed();
        await this.clickElement(this.logoutButton);
    }

    async verifyBrokenImagesExist() {
        const images = await browser.$$('[class="inventory_item_img"] img');
        const problemImages = [];

    for (const img of images) {
        const src = await img.getAttribute('src');
        if (src.includes('sl-404')) {
            problemImages.push(src);
        }
    }

    expect(problemImages.length).toBeGreaterThan(0);

    }

}

export default new InventoryPage();