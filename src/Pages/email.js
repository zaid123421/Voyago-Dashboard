import { createContext, useState } from "react";

export const Email = createContext({});

export default function EmailProvider({children}){
  const [authe, setAuthe] = useState({});
  return <Email.Provider value = {{ authe, setAuthe }}>{children}</Email.Provider>;
}