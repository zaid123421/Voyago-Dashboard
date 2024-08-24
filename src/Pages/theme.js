// import { createContext, useState } from "react";

// export const Theme = createContext({});

// export default function UserProvider({children}){
//   const [th, setTh] = useState("dark");
//   return <Theme.Provider value = {{th, setTh}}>{children}</Theme.Provider>;
// }


import React, { createContext, useState } from 'react';
export const Theme = createContext({});
export default function UserProvider({ children }) {
  const [th, setTh] = useState("dark");
  return (
    <Theme.Provider value={{ th, setTh }}>
      {children}
    </Theme.Provider>
  );
}