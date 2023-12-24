import { createContext, useContext, useState, ReactNode, FC } from "react";

const Store = createContext({});

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myData, setMydata] = useState<any[]>([]);

  function storeData(value: any) {
    const newData = [...myData, value];
    setMydata([...newData]);
    console.log(`newData`, newData);
    localStorage.setItem("pokemon", JSON.stringify(newData));
  }
  function getData() {
    const ls = localStorage.getItem("pokemon");

    const data: any[] = JSON.parse(ls ?? "[]");

    return data;
  }

  function deleteData(value: string) {
    const data = getData();

    console.log(`data before delete`, data, value);
    const newData = data.filter((val) => val.name !== value);

    console.log("data after deletion", newData);
    localStorage.setItem("pokemon", JSON.stringify(newData));
  }

  return (
    <Store.Provider value={{ storeData, getData, deleteData }}>
      {children}
    </Store.Provider>
  );
};

export default StoreProvider;

export function useStore() {
  return useContext(Store);
}
