import React from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import { Input, Card } from "antd";
import styles from "./PaymentForm.module.css";
import images from "react-payment-inputs/images";
import card from "../../assets/images/card-gcfd355413_640.png";

export const PaymentForm = () => {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  return (
    <Card
      title="信用卡"
      bordered={false}
      className={styles["payment-credit-card"]}
    >
      <div style={{ marginBottom: 20 }}>
        <img src={card} alt="卡片" width={352} height={200} />
      </div>
      <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images })} />
        <input {...getCardNumberProps()} />
        <input {...getExpiryDateProps()} />
        <input {...getCVCProps()} />
      </PaymentInputsWrapper>
    </Card>
  );
};
