import React, { createContext, useContext, useReducer } from 'react';
import { browserReducer } from '../reducer/Browser-reducer';

const initialValue ={
  name : ""
}

const AppContext = createContext(initialValue);


const AppProvider = ({ children }) => {

  const [{name}, browserDispatch] = useReducer(browserReducer, initialValue)

  const value = {
    name,
    browserDispatch
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

const useBrowser  = () => useContext(AppContext);

export { AppContext, AppProvider, useBrowser};
