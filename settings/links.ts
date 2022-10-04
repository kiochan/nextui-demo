const linkSettings = {
    home: "/",
    // 登录相关
    login: "/login",
    register: "/register",
    logout: "/logout",
    forgotPassword: "/forgot-password",

    // 信息页
    about: "/about",
    privacy: "/privacy",
    terms: "/terms",
    news: "/news",
    gallery: "/gallery",
    staff: "/staff",

    // 商店
    shop: "/shop",
    cart: "/cart",

    // 订单处理
    orders: "/orders",

    // 用户信息
    settings: "/settings",

    external: {
        // twitter: 'your link here'
    }
} as const

export default linkSettings