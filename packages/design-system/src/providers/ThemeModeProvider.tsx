import { PaletteMode, Theme } from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { themeGenerator } from "../index.js";

export const ThemeModeContext = createContext<{
  themeMode: PaletteMode;
  theme?: Theme;
  setThemeMode: (newMode: PaletteMode) => void;
  toggleThemeMode: () => void;
} | null>(null);

export default function ThemeModeProvider({
  mode = "light",
  children,
}: {
  mode?: PaletteMode;
  children: ReactNode;
}) {
  console.log(mode);
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  const theme = useMemo(() => {
    return themeGenerator(themeMode);
  }, [themeMode]);

  const toggleThemeMode = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, [setThemeMode]);
  const value = useMemo(
    () => ({ themeMode, setThemeMode, theme, toggleThemeMode }),
    [themeMode, theme]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
