import Page from './page.js';

class CompletePage extends Page {
  
    get completeMessage() {
        return $('.complete-header');
    }

    get backHomeButton() {
        return $('#back-to-products');
    }

    async verifyCompleteMessage() {
        await this.completeMessage.waitForDisplayed(); // гарантія, що елемент є
        await expect(await this.completeMessage.getText()).toContain('Thank you for your order!');
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

    async open() {
        await super.open('checkout-complete.html');
    }
}

export default new CompletePage();
