import Page from './page.js';

class ProductsPage extends Page {
    get productImages() {
        return $$('img.inventory_item_img');
    }

    async verifyAllProductImagesAreDisplayed() {
        const images = await this.productImages;
        for (const img of images) {
            const naturalWidth = await img.getProperty('naturalWidth');
            const naturalHeight = await img.getProperty('naturalHeight');
            expect(naturalWidth).toBeGreaterThan(0);
            expect(naturalHeight).toBeGreaterThan(0);
        }
    }
}

export default new ProductsPage();

