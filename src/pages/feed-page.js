import { MainLayout } from "../layouts/main-layout";
import { OrderFeed } from "../components/order-feed/order-feed.js";

export function FeedPage() {
  return (
    <MainLayout>
      <OrderFeed />
    </MainLayout>
  );
}
