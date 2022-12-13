import { MainLayout } from "../layouts/main-layout";
import { ProfilePageNav } from "../components/profile-page-nav/profile-page-nav.js";
import { ProfileComponent } from "../components/profile-component/profile-component.js";
import { ProfilePageOrders } from "../components/profile-page-orders/profile-page-orders.js";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export function ProfilePage() {
  const { path } = useRouteMatch();

  return (
    <MainLayout>
      <ProfilePageNav />
      <Switch>
        <Route path={path} exact>
          <ProfileComponent />
        </Route>
        <Route path={`${path}/orders`} exact>
          <ProfilePageOrders />
        </Route>
      </Switch>
    </MainLayout>
  );
}
