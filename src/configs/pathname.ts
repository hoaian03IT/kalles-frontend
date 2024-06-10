export const pathname = {
    me: "/me",
    home: "/",
    login: "/login",
    register: "/register",
    shop: "/shop",
    product: "/product",
    detailProduct: "/product-detail/:id",
    dashboard: function () {
        return this.me + "/dashboard";
    },

    address: function () {
        return this.me + "/address";
    },
    cart: "/your-cart",
};
