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
        await this.xLink.waitForClickable();
        await this.xLink.click();
    }

    async clickFacebook() {
        await this.facebookLink.waitForClickable();
        await this.facebookLink.click();
    }

    async clickLinkedin() {
        await this.linkedinLink.waitForClickable();
        await this.linkedinLink.click();
    }
}

export default new FooterPage();

