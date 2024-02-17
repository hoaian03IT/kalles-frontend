export const pathname = {
    me: "/me",
    home: "/",
    login: "/login",
    register: "/register",
    shop: "/shop",
    product: "/product",
    dashboard: function () {
        return this.me + "/dashboard";
    },

    address: function () {
        return this.me + "/address";
    },
};
