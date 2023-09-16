import { ReactNode } from 'react';
import { PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import useThemeMode from '../hooks/useThemeMode.js';
import ThemeModeProvider from './ThemeModeProvider.js';

type ProviderProps = {
  children: ReactNode;
  defaultThemeMode?: PaletteMode;
};

// Separate component to utilize hook
const WrappedThemeProvider = ({ children }: ProviderProps) => {
  const { theme } = useThemeMode();

  if (theme) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
  return <>{children}</>;
};

const MuiThemeProvider = ({ children, defaultThemeMode = 'light' }: ProviderProps) => {
  return (
    <ThemeModeProvider mode={defaultThemeMode}>
      <WrappedThemeProvider defaultThemeMode={defaultThemeMode}>{children}</WrappedThemeProvider>
    </ThemeModeProvider>
  );
};

export default MuiThemeProvider;
