import React from "react";
import { Image, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";

interface Props {
  id: number | string;
  size: "large" | "small";
  imageSrc: string;
  price: number | string;
  title: string;
}

export const ProductImage: React.FC<Props> = ({
  id,
  size,
  title,
  imageSrc,
  price,
}) => {
  const navigate = useNavigate();
  return (
    <Link to={`/detail/${id}`}>
      {size == "large" ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger">$ {price} 起</Typography.Text>
      </div>
    </Link>
  );
};
