import Page from './page.js';

class CheckoutPage extends Page {
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueBtn() { return $('input[data-test="continue"]'); }
    get finishBtn() { return $('button[data-test="finish"]'); }

    async waitForFormVisible() {
        await this.firstNameInput.waitForDisplayed();
        await this.lastNameInput.waitForDisplayed();
        await this.postalCodeInput.waitForDisplayed();
    }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.waitForFormVisible();

        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
    }

    async clickContinue() {
        await this.continueBtn.waitForClickable();
        await this.continueBtn.click();
    }

    async clickFinish() {
        await this.finishBtn.waitForClickable();
        await this.finishBtn.click();
    }

    async open() {
        await super.open('checkout-step-one.html');
    }
}

export default new CheckoutPage();
