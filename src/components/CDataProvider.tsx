"use client";
import React, { createContext, useContext, useState } from 'react';

type DataTypes = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const DataContext = createContext<DataTypes | null>(null);

export function CDataProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState("light");
  return (
    <DataContext.Provider value={{
      theme,
      setTheme
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
