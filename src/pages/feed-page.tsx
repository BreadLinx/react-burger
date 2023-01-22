import { MainLayout } from "layouts/main-layout";
import { OrderFeed } from "components/order-feed/order-feed";
import { FC } from "react";

export const FeedPage: FC = () => {
  return (
    <MainLayout>
      <OrderFeed />
    </MainLayout>
  );
};
