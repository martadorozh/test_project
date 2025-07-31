import Page from './page.js';

class CheckoutPage extends Page {
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueBtn() { return $('input[data-test="continue"]'); }
    get finishBtn() { return $('button[data-test="finish"]'); }

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

    async open() {
        await super.open('checkout-step-one.html');
    }
}

export default new CheckoutPage();

