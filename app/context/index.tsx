"use client";

import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>(undefined);

const Task = [
  {
    id: Math.floor(Math.random() * 100),
    text: "Go to market",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Grocery shopping",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Walking the dog",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Doing laundry",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Cooking dinner",
  },
];

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [tasks, setTasks] = useState(Task);
  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
