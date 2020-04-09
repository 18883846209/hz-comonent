import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useStaticRendering } from "mobx-react";

// import CommonStore from "@/stores/commonStore";
// import ThemeStore from "@/stores/themeStore";
import WarnStore from "@/stores/warnStore";
import ExecuteStore from "@/stores/executeStore";

let store;
const isServer = typeof window === "undefined";
useStaticRendering(isServer);

export const StoreContext = createContext();

export function initializeData(initialData = store || {}) {
  return {
    // commonStore: new CommonStore(initialData.commonStore),
    // themeStore: new ThemeStore(initialData.themeStore),
    warnStore: new WarnStore(initialData.warnStore),
    executeStore: new ExecuteStore(initialData.executeStore)
  };
}

export const InjectStoreContext = ({ children, initialData }) => {
  store = initializeData(initialData);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
InjectStoreContext.propTypes = {
  children: PropTypes.node,
  initialData: PropTypes.object
};
