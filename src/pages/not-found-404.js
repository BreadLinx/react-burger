import { MainLayout } from "../layouts/main-layout.js";
import { NotFountComponent } from "../components/not-found-404-component/not-found-404-component.js";

export function NotFound404() {
  return (
    <MainLayout>
      <NotFountComponent />
    </MainLayout>
  );
}
