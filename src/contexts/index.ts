import { createContext } from 'react';
import {IUserInfo} from "../interfaces";
interface StoreContextType {
  currentUser: IUserInfo,
}

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);