import React, { useEffect } from "react";
import { CheckOutCard, PaymentForm } from "../../components";
import { MainLayout } from "../../layout/mainLayout";
import { Row, Col } from "antd";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const jwt = useSelector((s) => s.user.token) as string;
  const order = useSelector((s) => s.order.currentOrder);
  const loading = useSelector((s) => s.order.loading);

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ orderId: order.id, jwt: jwt }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
