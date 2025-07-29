import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('TC06 - Sorting Products', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(1000);
        const url = await browser.getUrl();
        expect(url).toContain('inventory.html');

    });

    it('should sort products by all available options', async () => {
        const sortingOptions = [
            { value: 'lohi', compare: (a, b) => a - b }, // Price low to high
            { value: 'hilo', compare: (a, b) => b - a }, // Price high to low
            { value: 'az',   compare: (a, b) => a.localeCompare(b) }, // Name A to Z
            { value: 'za',   compare: (a, b) => b.localeCompare(a) }, // Name Z to A
        ];

        for (const option of sortingOptions) {
            const previousFirstName = await InventoryPage.getFirstProductName();

            await InventoryPage.selectSorting(option.value);

            await browser.waitUntil(
                async () => {
                    const currentFirstName = await InventoryPage.getFirstProductName();
                    return currentFirstName !== previousFirstName;
                },
                {
                    timeout: 3000,
                    timeoutMsg: 'expected first product name to change after sorting',
                }
            );

            if (option.value === 'lohi' || option.value === 'hilo') {
                const prices = await InventoryPage.getAllProductPrices();
                const sorted = [...prices].sort(option.compare);
                expect(prices).toEqual(sorted);
            } else {
                const names = await InventoryPage.getAllProductNames();
                const sorted = [...names].sort(option.compare);
                expect(names).toEqual(sorted);
            }
        }
    });
});
