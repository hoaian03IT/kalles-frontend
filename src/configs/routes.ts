import { lazy } from "react";
import { pathname } from "./pathname";
import { PrimaryLayout } from "~/layouts";

const HomeScreen = lazy(() => import("~/screens/HomeScreen"));

export const publicRoutes = [{ path: pathname.home, component: HomeScreen, layout: PrimaryLayout }];
