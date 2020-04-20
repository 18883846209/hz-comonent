import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useStaticRendering } from "mobx-react";

import WarnStore from "@/stores/warnStore";
import ConfigStore from "@/stores/configStore";

let store;
const isServer = typeof window === "undefined";
useStaticRendering(isServer);

export const StoreContext = createContext();

export function initializeData(initialData = store || {}) {
  return {
    warnStore: new WarnStore(initialData.warnStore),
    configStore: new ConfigStore(initialData.configStore)
  };
}

export const InjectStoreContext = ({ children, initialData }) => {
  if (!store) {
    store = initializeData(typeof window === "undefined" ? {} : initialData);
  }
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
InjectStoreContext.propTypes = {
  children: PropTypes.node,
  initialData: PropTypes.object
};

export function inject(selector) {
  return WrappedComponent => {
    const NewComponent = ownProps => {
      return (
        <StoreContext.Consumer>
          {value => {
            let props;
            if (Array.isArray(selector)) {
              props = {
                ...ownProps
              };
              selector.forEach(key => {
                props[key] = value[key];
              });
            } else if (typeof selector === "string") {
              props = {
                ...ownProps,
                [selector]: value[selector]
              };
            } else {
              props = { ...props, ...selector({ store: value, ownProps }) };
            }
            return <WrappedComponent {...props} />;
          }}
        </StoreContext.Consumer>
      );
    };
    return NewComponent;
  };
}
