import { MainLayout } from "layouts/main-layout";
import { ProfilePageNav } from "components/profile-page-nav/profile-page-nav";
import { ProfileComponent } from "components/profile-component/profile-component";
import { ProfilePageOrders } from "components/profile-page-orders/profile-page-orders";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { FC } from "react";

export const ProfilePage: FC = () => {
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
};
