import words from '../../config/words';
import links from '../../config/links';

export const loginOptions = [
    {
        link: links.login,
        name: words.site.titles.login
    },
    {
        link: links.register,
        name: words.site.titles.register
    }
]

export const userSettings = [
    {
        link: links.orders,
        name: words.site.titles.orders
    },
    {
        link: links.settings,
        name: words.site.titles.settings
    },
    {
        link: links.logout,
        name: words.site.titles.logout
    }
]

export const pages = [
    {
        link: links.home,
        name: words.site.titles.en.home
    },
    {
        link: links.news,
        name: words.site.titles.en.news
    },
    {
        link: links.shop,
        name: words.site.titles.en.shop
    },
    {
        link: links.gallery,
        name: words.site.titles.en.gallery
    },
    {
        link: links.staff,
        name: words.site.titles.en.staff
    }
]