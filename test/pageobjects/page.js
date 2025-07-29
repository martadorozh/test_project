import { browser } from '@wdio/globals'

export default class Page {
    
    open(path) {
        if (path.startsWith('http')) {
            return browser.url(path)
        }
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}
