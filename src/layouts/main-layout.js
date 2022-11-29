import { AppHeader } from "../components/app-header/app-header.js";
import { ErrorCard } from "../components/error-card/error-card.js";
import { SuccessCard } from "../components/success-card/success-card.js";

export function MainLayout({ children }) {
  return (
    <>
      <AppHeader />
      <main className="main">
        <ErrorCard />
        <SuccessCard />
        {children}
      </main>
    </>
  );
}
