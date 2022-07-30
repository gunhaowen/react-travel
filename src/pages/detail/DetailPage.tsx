import React, { useState, useEffect } from "react";
import { useMatch, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Spin,
  Row,
  Col,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from "antd";
import styles from "./DetailPage.module.css";
import {
  Header,
  Footer,
  ProductIntro,
  ProductComments,
} from "../../components";
import { DatePicker, Space } from "antd";
import { commentMockData } from "./mockup";
import { productDetailSlice } from "../../redux/productDetail/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { getProductDetail } from "../../redux/productDetail/slice";
import { MainLayout } from "../../layout/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCart } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;

type MatchParams = {
  touristRouteId: string;
};

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);
  const dispatch = useAppDispatch();
  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (touristRouteId) {
      dispatch(getProductDetail(touristRouteId));
    }
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }

  if (error) {
    return <div>網站出錯: {error}</div>;
  }

  return (
    <MainLayout>
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            {jwt ? (
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={() => {
                  dispatch(
                    addShoppingCart({ jwt, touristRouteId: product.id })
                  );
                }}
              >
                <ShoppingCartOutlined />
                放入購物車
              </Button>
            ) : (
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                type="primary"
                danger
                loading={false}
                onClick={() => {
                  navigate("/singIn");
                }}
              >
                <ShoppingCartOutlined />
                放入購物車
              </Button>
            )}

            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <Anchor.Link href="#features" title="產品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#fees" title="费用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#notes" title="預定須知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Anchor.Link href="#comments" title="用戶評價"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      <div id="features" className={styles["product-detail-container"]}>
        <Divider orientation={`center`}>
          <Typography.Title level={3}>產品特色</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={`center`}>
          <Typography.Title level={3}>費用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={`center`}>
          <Typography.Title level={3}>預定須知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.notes }}
          style={{ margin: 50 }}
        ></div>
      </div>
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={`center`}>
          <Typography.Title level={3}>用戶評價</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  );
};
