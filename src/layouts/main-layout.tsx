import { AppHeader } from "components/app-header/app-header";
import { ErrorCard } from "components/error-card/error-card";
import { SuccessCard } from "components/success-card/success-card";
import { FC, ReactNode } from "react";

interface IMainLayout {
  children: ReactNode;
}

export const MainLayout: FC<IMainLayout> = ({ children }) => {
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
};
