import {MainLayout} from "../layouts/main-layout";
import {ProfilePageNav} from '../components/profile-page-nav/profile-page-nav.js';
import {ProfileComponent} from '../components/profile-component/profile-component.js';

export function ProfilePage() {
  return (
    <MainLayout>
      <ProfilePageNav/>
      <ProfileComponent/>
    </MainLayout>
  );
}