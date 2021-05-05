import { createContext } from "react";

export const TokenContext = createContext({ sessionToken: "" });

export const UserContext = createContext(null);
