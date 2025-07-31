export default class Page {
    open(path) {
        if (path.startsWith('http')) {
            return browser.url(path);
        }
        return browser.url(`https://www.saucedemo.com/${path}`);
    }

    async pause(ms = 1000) {
        await browser.pause(ms);
    }

    async clickElement(element) {
        await element.waitForClickable();
        await element.click();
    }

    async waitForDisplayed(element) {
        await element.waitForDisplayed();
    }

    async isDisplayed(element) {
        const exists = await element.isExisting();
        if (!exists) {
            return false;
        }
        return await element.isDisplayed();
    } 

    async getText(element) {
        await element.waitForDisplayed();
        return await element.getText();
    }

    async setValue(element, value) {
        await element.waitForDisplayed();

        const tagName = await element.getTagName();

        if (tagName === 'select') {
            await element.selectByAttribute('value', value);
        } else {
            await element.clearValue();
            await element.setValue(value);
        }
    }

    async getAttribute(element, attr) {
        await element.waitForDisplayed();
        return await element.getAttribute(attr);
    }
}
