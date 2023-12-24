import { createContext, useContext, useState, ReactNode, FC } from "react";

const Store = createContext({});

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <Store.Provider value={{ modal, setModal }}>{children}</Store.Provider>
  );
};

export default StoreProvider;

export function useStore() {
  return useContext(Store);
}
