import React from "react";
import { useContext, useReducer } from "react";

// https://www.youtube.com/watch?v=J-g9ZJha8FE make store reference

export function makeStore(reducer, initialState) {
  const dispatchContext = React.createContext();
  const storeContext = React.createContext();

  const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);
    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  function useDispatch() {
    return useContext(dispatchContext);
  }

  function useStore() {
    return useContext(storeContext);
  }

  return [StoreProvider, useDispatch, useStore];
}
