import { lazy } from "react";
import { pathname } from "./pathname";
import { PrimaryLayout, SecondaryLayout } from "~/layouts";

const HomeScreen = lazy(() => import("~/screens/HomeScreen"));
const LoginScreen = lazy(() => import("~/screens/LoginScreen"));
const RegisterScreen = lazy(() => import("~/screens/RegisterScreen"));
const ShopScreen = lazy(() => import("~/screens/ShopScreen"));
const ProductScreen = lazy(() => import("~/screens/ProductScreen"));

export const publicRoutes = [
    { path: pathname.home, component: HomeScreen, layout: PrimaryLayout },
    { path: pathname.login, component: LoginScreen, layout: SecondaryLayout },
    { path: pathname.register, component: RegisterScreen, layout: SecondaryLayout },
    { path: pathname.shop, component: ShopScreen, layout: SecondaryLayout },
    { path: pathname.product, component: ProductScreen, layout: SecondaryLayout },
];
