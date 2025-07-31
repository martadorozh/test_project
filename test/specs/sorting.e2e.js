import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('TC06 - Sorting Products', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.pause(1000);
    });

    it('should sort products by all available options', async () => {
        const sortingOptions = [
            { value: 'lohi', compare: (a, b) => a - b },
            { value: 'hilo', compare: (a, b) => b - a },
            { value: 'az',   compare: (a, b) => a.localeCompare(b) },
            { value: 'za',   compare: (a, b) => b.localeCompare(a) },
        ];

        for (const option of sortingOptions) {
            const previousFirstName = await inventoryPage.getFirstProductName();

            await inventoryPage.selectSorting(option.value);

            await browser.waitUntil(
                async () => {
                    const currentFirstName = await inventoryPage.getFirstProductName();
                    return currentFirstName !== previousFirstName;
                },
                {
                    timeout: 3000,
                    timeoutMsg: 'expected first product name to change after sorting',
                }
            );

            if (option.value === 'lohi' || option.value === 'hilo') {
                const prices = await inventoryPage.getAllProductPrices();
                const sorted = [...prices].sort(option.compare);
                expect(prices).toEqual(sorted);
            } else {
                const names = await inventoryPage.getAllProductNames();
                const sorted = [...names].sort(option.compare);
                expect(names).toEqual(sorted);
            }
        }
    });
});

