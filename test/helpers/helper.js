import { expect } from '@wdio/globals';

export default {
    async verifyTextEquals(element, expectedText) {
        await element.waitForDisplayed();
        const actualText = await element.getText();
        expect(actualText).toBe(expectedText);
    },

    async verifyTextContains(element, expectedSubstring) {
        await element.waitForDisplayed();
        const actualText = await element.getText();
        expect(actualText).toContain(expectedSubstring);
    },

    async verifyElementVisible(element) {
        await element.waitForDisplayed();
        const isVisible = await element.isDisplayed();
        expect(isVisible).toBe(true);
    },

    async verifyFieldHighlighted(element) {
        const classAttr = await element.getAttribute('class');
        expect(classAttr).toContain('input_error');
    },

    async verifyUrlContains(expected) {
        const url = await browser.getUrl();
        expect(url).toContain(expected);
    },

    async verifyInputValue(element, expectedValue) {
        await element.waitForDisplayed();
        const value = await element.getValue();
        expect(value).toBe(expectedValue);
    },

    async verifyXIconsCount(expectedCount = 2) {
        const xIcons = await $$('svg[data-icon="times-circle"]');
        expect(xIcons.length).toBe(expectedCount);
    }
};