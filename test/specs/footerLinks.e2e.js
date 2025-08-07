import loginPage from '../pageobjects/login.page.js';
import footerPage from '../pageobjects/footer.page.js';
import helper from '../helpers/helper.js';

describe('TC07 - Footer Links', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should open footer social links in new tabs', async () => {
        await footerPage.verifySocialLinks(helper);
    });
});
