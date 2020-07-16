import { createContext } from "react";
interface User {
  id: string;
  email: string;
}
export const Context = createContext<{
  currentUser: null | User;
  setUser: any;
}>({ currentUser: null, setUser: () => {} });
