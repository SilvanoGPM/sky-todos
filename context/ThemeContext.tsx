import React, { createContext, FC, useState } from "react";

export type ThemesEnum = "light" | "dark";

type ThemeContextProps = {
  children: React.ReactNode;
};

type ContextType = {
  theme: ThemesEnum;
  setTheme: (theme: ThemesEnum) => void;
};

const INITIAL_VALUE: ContextType = {
  theme: "light",
  setTheme: (theme: ThemesEnum) => {},
};

export const ThemeContext = createContext<ContextType>(INITIAL_VALUE);

export const ThemeProvider: FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemesEnum>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
