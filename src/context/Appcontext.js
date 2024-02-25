import React, { createContext, useContext, useReducer } from 'react';
import { browserReducer } from '../reducer/Browser-reducer';

const initialValue ={
  name : "",
  time : "",
  message:"",
  task: null
}

const AppContext = createContext(initialValue);


const AppProvider = ({ children }) => {

  const [{name, time, message, task}, browserDispatch] = useReducer(browserReducer, initialValue)

  const value = {
    name,
    time,
    message,
    task,
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
