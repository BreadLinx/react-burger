import { useEffect, useState, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-wrapper.module.css";

interface ITabWrapper {
  inViewBuns: boolean;
  inViewSauces: boolean;
  inViewMains: boolean;
}

export const TabWrapper: FC<ITabWrapper> = ({
  inViewBuns,
  inViewSauces,
  inViewMains,
}) => {
  const [currentTab, setCurrentTab] = useState("buns");

  function setCurrentTabOnClick(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("buns");
    } else if (inViewSauces) {
      setCurrentTab("sauces");
    } else if (inViewMains) {
      setCurrentTab("mains");
    }
  }, [inViewBuns, inViewSauces, inViewMains]);

  return (
    <div className={`mt-5 ${styles.box}`}>
      <Tab
        value="buns"
        active={currentTab === "buns"}
        onClick={setCurrentTabOnClick}
      >
        Булки
      </Tab>
      <Tab
        value="sauces"
        active={currentTab === "sauces"}
        onClick={setCurrentTabOnClick}
      >
        Соусы
      </Tab>
      <Tab
        value="mains"
        active={currentTab === "mains"}
        onClick={setCurrentTabOnClick}
      >
        Начинки
      </Tab>
    </div>
  );
};
