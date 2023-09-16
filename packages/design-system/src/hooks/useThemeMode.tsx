import { useContext } from 'react';
import { ThemeModeContext } from '../providers/ThemeModeProvider.js';

export default function useThemeMode() {
  const themeValues = useContext(ThemeModeContext);

  if (!themeValues) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }

  return themeValues;
}
