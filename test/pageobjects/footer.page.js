import Page from './page.js';

class FooterPage extends Page {
    get xLink() {
        return $('[data-test="social-twitter"]');
    }

    get facebookLink() {
        return $('[data-test="social-facebook"]');
    }

    get linkedinLink() {
        return $('[data-test="social-linkedin"]');
    }

    async clickX() {
        await this.clickElement(this.xLink);
    }

    async clickFacebook() {
        await this.clickElement(this.facebookLink);
    }

    async clickLinkedin() {
        await this.clickElement(this.linkedinLink);
    }

    async isTwitterVisible() {
        return this.isDisplayed(this.xLink);
    }

    async isFacebookVisible() {
        return this.isDisplayed(this.facebookLink);
    }

    async isLinkedinVisible() {
        return this.isDisplayed(this.linkedinLink);
    }
}

export default new FooterPage();
