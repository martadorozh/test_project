import { Given, When, Then } from '@wdio/cucumber-framework';
import loginPage from '../../pageobjects/login.page.js';

Given('User is on the saucedemo main page', async () => {
    await loginPage.open();
});

When('User clicks the Login button', async () => {
    await loginPage.submit();
});

Then('User should see {string} error message', async (expectedError) => {
    await loginPage.verifyErrorMessage(expectedError);
});

