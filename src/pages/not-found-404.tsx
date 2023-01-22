import { MainLayout } from "layouts/main-layout";
import { NotFountComponent } from "components/not-found-404-component/not-found-404-component";
import { FC } from "react";

export const NotFound404: FC = () => {
  return (
    <MainLayout>
      <NotFountComponent />
    </MainLayout>
  );
};
