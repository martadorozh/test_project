import loginPage from '../pageobjects/login.page.js';
import footerPage from '../pageobjects/footer.page.js';

describe('TC07 - Footer Links', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.pause(1000);
    });

    it('should open footer social links in new tabs', async () => {
        const socialLinks = [
            { element: footerPage.xLink, expectedUrl: 'x.com' },
            { element: footerPage.facebookLink, expectedUrl: 'facebook.com' },
            { element: footerPage.linkedinLink, expectedUrl: 'linkedin.com' },
        ];

        for (const { element, expectedUrl } of socialLinks) {
            const originalWindow = await browser.getWindowHandle();

            await element.scrollIntoView();
            await element.click();

            const allWindows = await browser.getWindowHandles();
            const newWindow = allWindows.find(win => win !== originalWindow);

            expect(newWindow).toBeDefined();
            await browser.switchToWindow(newWindow);
            await footerPage.pause(2000);

            const url = await browser.getUrl();
            expect(url).toContain(expectedUrl);

            await browser.closeWindow();
            await browser.switchToWindow(originalWindow);
        }
    });
});
