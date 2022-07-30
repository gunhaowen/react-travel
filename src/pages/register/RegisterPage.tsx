import React from "react";
import { UserLayout } from "../../layout/userLayout";
import { RegisterFrom } from "./RegisterFrom";

export const RegisterPage: React.FC = () => {
  return (
    <UserLayout>
      <RegisterFrom />
    </UserLayout>
  );
};
