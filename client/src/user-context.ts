import { createContext } from "react";
interface User {
  id: string;
  email: string;
}
export const UserContext = createContext<
  { currentUser: null } | { currentUser: User }
>({ currentUser: null });
