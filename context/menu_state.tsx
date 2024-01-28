"use client";

import { createContext, useState } from "react";

interface ChildrenI {
  children: React.ReactNode;
}

type MenuContextType = {
  open: boolean | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuContextStateI = {
  open: null,
  setOpen: () => {},
};

export const MenuStateContext =
  createContext<MenuContextType>(MenuContextStateI);

export default function MenuStateProvider({ children }: ChildrenI) {
  const [menuState, setMenuState] = useState(false);

  return (
    <MenuStateContext.Provider
      value={{ open: menuState, setOpen: setMenuState }}
    >
      {children}
    </MenuStateContext.Provider>
  );
}
