import React, { createContext, useState } from 'react';

export const MyStringContext = createContext({});

export default function MyStringProvider({ children }) {
  const [myString, setMyString] = useState("default value");

  return (
    <MyStringContext.Provider value={{ myString, setMyString }}>
      {children}
    </MyStringContext.Provider>
  );
}