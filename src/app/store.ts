import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/userReducer";
import categoryReducer from "./features/category/categoryReducer";
import listProductReducer from "./features/products/productListReducer";
import productReducer from "./features/products/productReducer";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducerNeededCombine = { category: categoryReducer, user: userReducer };

const persistedReducer = persistCombineReducers(persistConfig, reducerNeededCombine);

const rootReducer = combineReducers({
    persist: persistedReducer,
    products: listProductReducer,
    product: productReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
