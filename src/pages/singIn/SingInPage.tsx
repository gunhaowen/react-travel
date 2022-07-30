import React from "react";
import { UserLayout } from "../../layout/userLayout";
import { SingInFrom } from "./SingInFrom";

export const SingInPage: React.FC = (props) => {
  return (
    <UserLayout>
      <SingInFrom />
    </UserLayout>
  );
};
