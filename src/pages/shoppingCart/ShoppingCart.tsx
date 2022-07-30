import React, { useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { clearShoppingCart, checkouts } from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";

export const ShoppingCartPage: React.FC = () => {
  const loading = useSelector((s) => s.shoppingCart.loading);
  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles["payment-card-container"]}>
            <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />
          </div>
        </Col>
        <Col span={8}>
          <Affix>
            <div className={styles["product-list-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) {
                    return;
                  }
                  dispatch(checkouts(jwt));
                  navigate("/placeOrder");
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCart({
                      itemIds: shoppingCartItems.map((s) => s.id),
                      jwt,
                    })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
