import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
import { useTranslation, withTranslation } from "react-i18next";
const { Header, Footer, Content } = Layout;

interface PropsTypes {
  children: React.ReactNode;
}

export const UserLayout: React.FC<PropsTypes> = (props) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  const { t } = useTranslation();

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              选择语言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img alt="logo" className={styles["logo"]} src={logo} />
              <span className={styles["title"]}>{t("header.title")}</span>
            </Link>
          </div>
          <div className={styles["desc"]}>{t("header.slogan")}</div>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>{t("footer.detail")}</Footer>
    </Layout>
  );
};
