import { createContext } from "react";

export type CurrentUser = {
  email: string;
  id: string;
};

export const ApplicationContext = createContext<{
  currentUser: CurrentUser;
}>({ currentUser: { email: "", id: "" } });
