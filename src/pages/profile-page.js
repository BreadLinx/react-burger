import { MainLayout } from "../layouts/main-layout";
import { ProfilePageNav } from "../components/profile-page-nav/profile-page-nav.js";
import { ProfileComponent } from "../components/profile-component/profile-component.js";
import { Switch, Route } from "react-router-dom";

export function ProfilePage() {
  return (
    <MainLayout>
      <ProfilePageNav />
      <Switch>
        <Route>
          <ProfileComponent />
        </Route>
        <Route path={`/orders`}>
          <h2>123123</h2>
        </Route>
      </Switch>
    </MainLayout>
  );
}
