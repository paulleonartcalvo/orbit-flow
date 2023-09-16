import { Components, Theme } from '@mui/material';

// import type {} from '@mui/x-data-grid-pro/themeAugmentation';
// import type {} from '@mui/x-date-pickers-pro/themeAugmentation';

// import { MuiAccordion } from './MuiAccordion';
// import { MuiAccordionDetails } from './MuiAccordionDetails';
// import { MuiAccordionSummary } from './MuiAccordionSummary';
// import { MuiAutocomplete } from './MuiAutocomplete';
// import { MuiBadge } from './MuiBadge';
import { MuiButton } from './MuiButton.js';
import { MuiButtonBase } from './MuiButtonBase.js';
// import { MuiChip } from './MuiChip';
// import { MuiCircularProgress } from './MuiCircularProgress';
// import { MuiCssBaseline } from './MuiCssBaseline';
// import { MuiDialogTitle } from './MuiDialogTitle';
// import { MuiDrawer } from './MuiDrawer';
// // import { MuiFilledInput } from './MuiFilledInput';
// import { MuiFormHelperText } from './MuiFormHelperText';
import { MuiIconButton } from './MuiIconButton.js';
// import { MuiInput } from './MuiInput';
// import { MuiInputAdornment } from './MuiInputAdornment';
// import { MuiInputLabel } from './MuiInputLabel';
// import { MuiSkeleton } from './MuiSkeleton';
// import { MuiSvgIcon } from './MuiSvgIcon';
// import { MuiTab } from './MuiTab';
// import { MuiTabs } from './MuiTabs';
// import { MuiToggleButton } from './MuiToggleButton';
// import { MuiTooltip } from './MuiTooltip';
// import { MuiTypography } from './MuiTypography';

const overrides: Components<Omit<Theme, 'components'>> = {
  // MuiFilledInput,
  //   MuiAccordion,
  //   MuiAccordionDetails,
  //   MuiAccordionSummary,
  //   MuiAutocomplete,
  //   MuiBadge,
  MuiButton,
  MuiButtonBase,
  //   MuiChip,
  //   MuiCircularProgress,
  //   MuiCssBaseline,
  //   MuiDialogTitle,
  //   MuiDrawer,
  //   MuiFormHelperText,
  MuiIconButton
  //   MuiInput,
  //   MuiInputAdornment,
  //   MuiInputLabel,
  //   MuiSkeleton,
  //   MuiSvgIcon,
  //   MuiTab,
  //   MuiTabs,
  //   MuiToggleButton,
  //   MuiTooltip,
  //   MuiTypography
};

export default overrides;
