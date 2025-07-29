import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import FooterPage from '../pageobjects/footer.page.js';

describe('TC07 - Footer Links', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(await browser.getUrl()).toContain('inventory.html');
    });

    it('should open footer social links in new tabs', async () => {
        const socialLinks = [
            { element: FooterPage.xLink, expectedUrl: 'x.com' },
            { element: FooterPage.facebookLink, expectedUrl: 'facebook.com' },
            { element: FooterPage.linkedinLink, expectedUrl: 'linkedin.com' },
        ];

        for (const { element, expectedUrl } of socialLinks) {
            const originalWindow = await browser.getWindowHandle();

            await element.scrollIntoView();
            await element.click();

            const allWindows = await browser.getWindowHandles();
            const newWindow = allWindows.find(win => win !== originalWindow);

            expect(newWindow).toBeDefined();
            await browser.switchToWindow(newWindow);
            await browser.pause(2000);

            const url = await browser.getUrl();
            expect(url).toContain(expectedUrl);

            await browser.closeWindow();
            await browser.switchToWindow(originalWindow);
        }
    });
});
