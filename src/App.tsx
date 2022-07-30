import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import {
  HomePage,
  SingInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage,
} from "./pages";
import { Navigate } from "react-router";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppingCart/slice";

const PrivateRoute = ({ children }) => {
  const jwt = useSelector((s) => s.user.token);
  return jwt ? children : <Navigate to={"/singIn"} />;
};

function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/singIn" element={<SingInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/placeOrder"
            element={
              <PrivateRoute>
                <PlaceOrderPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>404 not found </h1>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
