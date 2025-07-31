import Page from './page.js';

class CompletePage extends Page {
    get completeMessage() { return $('.complete-header'); }
    get backHomeButton() { return $('#back-to-products'); }

    async verifyCompleteMessage() {
        const text = await this.getText(this.completeMessage);
        expect(text).toContain('Thank you for your order!');
    }

    async clickBackHome() {
        await this.clickElement(this.backHomeButton);
    }

    async open() {
        await super.open('checkout-complete.html');
    }
}

export default new CompletePage();

