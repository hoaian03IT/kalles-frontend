import { lazy } from "react";
import { pathname } from "./pathname";
import { PrimaryLayout, SecondaryLayout } from "~/layouts";

const HomeScreen = lazy(() => import("~/screens/HomeScreen"));
const LoginScreen = lazy(() => import("~/screens/LoginScreen"));
const RegisterScreen = lazy(() => import("~/screens/RegisterScreen"));
const ShopScreen = lazy(() => import("~/screens/ShopScreen"));
const ProductScreen = lazy(() => import("~/screens/ProductScreen"));
const ProductDetailScreen = lazy(() => import("~/screens/ProductDetailScreen"));
const CartScreen = lazy(() => import("~/screens/CartScreen"));
const WhitelistScreen = lazy(() => import("~/screens/WhitelistScreen"));
const CheckoutScreen = lazy(() => import("~/screens/CheckoutScreen"));

export const publicRoutes = [
    { path: pathname.home, component: HomeScreen, layout: PrimaryLayout },
    { path: pathname.login, component: LoginScreen, layout: SecondaryLayout },
    {
        path: pathname.register,
        component: RegisterScreen,
        layout: SecondaryLayout,
    },
    { path: pathname.shop, component: ShopScreen, layout: SecondaryLayout },
    { path: pathname.product, component: ProductScreen, layout: SecondaryLayout },
    {
        path: pathname.detailProduct,
        component: ProductDetailScreen,
        layout: SecondaryLayout,
    },
    { path: pathname.cart, component: CartScreen, layout: SecondaryLayout },
    {
        path: pathname.whitelist,
        component: WhitelistScreen,
        layout: SecondaryLayout,
    },
    {
        path: pathname.checkout,
        component: CheckoutScreen,
        layout: null,
    },
];

export const privateRoutes = [];
