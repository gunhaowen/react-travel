import React, { useEffect } from "react";
import styles from "./SearchPage.module.css";
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/productSearch/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layout/mainLayout";

type MarchParams = {
  keywords: string;
};

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MarchParams>();

  const loading = useSelector((state) => state.searchProduct.loading);
  const error = useSelector((state) => state.searchProduct.error);
  const pagination = useSelector((state) => state.searchProduct.pagination);
  const productList = useSelector((state) => state.searchProduct.data);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (keywords) {
      dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
    }
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    if (keywords) {
      dispatch(searchProduct({ nextPage, pageSize, keywords }));
    }
  };

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
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
