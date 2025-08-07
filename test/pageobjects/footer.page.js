class FooterPage {
    get xLink() {
        return $('[data-test="social-twitter"]');
    }
    get facebookLink() {
        return $('[data-test="social-facebook"]');
    }
    get linkedinLink() {
        return $('[data-test="social-linkedin"]');
    }

    get socialLinks() {
        return [
            { element: this.xLink, expectedUrl: 'x.com' },
            { element: this.facebookLink, expectedUrl: 'facebook.com' },
            { element: this.linkedinLink, expectedUrl: 'linkedin.com' },
        ];
    }

    async clickElement(element) {
        await element.waitForExist({ timeout: 5000 });
        await element.scrollIntoView();
        await element.click();
    }

    async verifySocialLinks(helper) {
        for (const { element, expectedUrl } of this.socialLinks) {
            const originalWindow = await browser.getWindowHandle();

            await this.clickElement(element);

            const allWindows = await browser.getWindowHandles();
            const newWindow = allWindows.find(win => win !== originalWindow);

            expect(newWindow).toBeDefined();

            await browser.switchToWindow(newWindow);
            await helper.verifyUrlContains(expectedUrl);

            await browser.closeWindow();
            await browser.switchToWindow(originalWindow);
        }
    }
}

export default new FooterPage();
