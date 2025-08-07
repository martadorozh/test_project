import Page from './page.js';

class CheckoutPage extends Page {
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueBtn() { return $('input[data-test="continue"]'); }
    get finishBtn() { return $('button[data-test="finish"]'); }
    get itemName() { return $('[data-test="inventory-item-name"]'); }
    get totalLabel() { return $('[data-test="total-label"]'); }
    get taxLabel() { return $('[data-test="tax-label"]'); }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.setValue(this.firstNameInput, firstName);
        await this.setValue(this.lastNameInput, lastName);
        await this.setValue(this.postalCodeInput, postalCode);
    }

    async clickContinue() {
        await this.clickElement(this.continueBtn);
    }

    async clickFinish() {
        await this.clickElement(this.finishBtn);
    }

    async getItemNameText() {
        return await this.getText(this.itemName);
    }

    async getTotalAmount() {
        const totalText = await this.getText(this.totalLabel);
        return parseFloat(totalText.replace('Total: $', ''));
    }

    async getTaxAmount() {
        const taxText = await this.getText(this.taxLabel);
        return parseFloat(taxText.replace('Tax: $', ''));
    }

    async verifyTotalWithTax(expectedSubtotal) {
        const total = await this.getTotalAmount();
        const tax = await this.getTaxAmount();
        expect(total).toBeCloseTo(expectedSubtotal + tax, 2);
    }

    async open() {
        await super.open('checkout-step-one.html');
    }
}

export default new CheckoutPage();

