import { createStore, applyMiddleware } from "redux";
import languageRedux from "./language/languageRedux";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { orderSlice } from "./order/slice";

const presistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  language: languageRedux,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  searchProduct: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
});

const persisitedReducer = persistReducer(presistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

const store = configureStore({
  reducer: persisitedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default { store, persistor };
