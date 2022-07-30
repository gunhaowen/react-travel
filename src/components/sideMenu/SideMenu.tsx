import React from "react";
import styles from "./SideMenu.module.css";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined, GiftFilled } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles["side-menu"]}>
      {sideMenuList.map((m, index) => (
        <Menu.SubMenu
          key={`side-menu-${index}`}
          title={
            <span>
              <GiftFilled />
              {m.title}
            </span>
          }
        >
          {m.subMenu.map((sm, smindex) => (
            <Menu.SubMenu
              key={`sub-menu-${smindex}`}
              title={
                <span>
                  <GiftFilled />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((sms, smsindex) => (
                <Menu.Item key={`sub-sub-menu-${smsindex}`}>
                  <span>
                    <GiftFilled />
                    {sms}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};
