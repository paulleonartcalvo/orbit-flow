import { Theme, ThemeOptions } from "@mui/material";
// // import '@mui/material/Typography';

// import { TypographyOptions } from '@mui/material/styles/createTypography';
// import { tokens } from './tokens';

// /**
//  * Define the theme spacing helpers and enum
//  */
// const spacingValues = [0, ...Object.values(tokens.spacing.spacing)];
// type ThemeSpacing = keyof typeof tokens.spacing.spacing;
// const spacingKeys = Object.keys(tokens.spacing.spacing) as ThemeSpacing[];
// const multiplier = tokens.spacing.multiplier;

// /**
//  *
//  * The following options are available. These assume the current theme multiplier is 4.
//  * @desc none 0px
//  * @desc smallest 2px
//  * @desc tiny 4px
//  * @desc smaller 8px
//  * @desc small 12px
//  * @desc default 16px
//  * @desc large 24px
//  * @desc larger 32px
//  * @desc largest 48px
//  */
// export const Spacings: Record<ThemeSpacing | 'none', number> = {
//   none: 0,
//   ...(spacingKeys.reduce((prev: Partial<Record<ThemeSpacing, number>>, name, index) => {
//     prev[name] = index + 1;
//     return prev;
//   }, {}) as Record<ThemeSpacing, number>)
// };

export const Spacings = {
  none: 0,
  smallest: 0.5,
  tiny: 1,
  smaller: 2,
  small: 3,
  default: 4,
  large: 6,
  larger: 8,
  largest: 12,
} as const;

const multiplier = 4;
const spacingValues = Object.values(Spacings);
const spacing = (val: number) => {
  return spacingValues[val] * multiplier;
};

const fontFamily = "'Didact Gothic', sans-serif";
export function verdigoThemeOptions(
  mode: Theme["palette"]["mode"]
): ThemeOptions {
  console.log(mode);
  /**
   * @param {Object} spacing [none, x-small, small, default, medium, large]
   */
  const options: ThemeOptions = {
    typography: {
      fontFamily: fontFamily,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 400,
      fontWeightBold: 700,
    },
    spacing: spacing,
    shape: {
      borderRadius: 2,
    },
    palette: {
      // primary: {
      //   // dark: '#A6D3A0',
      //   main: '#D1FFD7'
      //   // ,light: '#B3FFB3'
      // },
      primary: {
        // dark: '#A6D3A0',
        main: "#00e88f",
        // ,light: '#B3FFB3'
      },
      secondary: {
        main: "#656565",
      },
      background: {},
      action: {
        hover: "#B3FFB3",
      },
    },
    // transitions: {
    //   ...tokens.transitions
    // },
    // layout: tokens.webLayout,
    // palette: {
    //   mode,
    //   common: tokens.common,
    //   contrastThreshold: 3,
    //   ...(mode === 'light' ? tokens.light : tokens.dark)
    //   // TO-DO: fill the rest with colors here, not sure what matches
    //   // ERROR, WARNING, INFO, SUCCESS https://mui.com/customization/palette/
    //   // https://premisedata.github.io/portal-design-system/?path=/story/design-system-tokens--colors
    // },
    // shadows: ['none', ...tokens.elevation] as ThemeOptions['shadows'],
    // typography: {
    //   ...tokens.typography
    // } as TypographyOptions
  };

  return options;
}

// export function verdigoThemeOptions(mode: Theme['palette']['mode']): ThemeOptions {
//   /**
//    * @param {Object} spacing [none, x-small, small, default, medium, large]
//    */
//   const options: ThemeOptions = {
//     spacing,
//     transitions: {
//       ...tokens.transitions
//     },
//     layout: tokens.webLayout,
//     palette: {
//       mode,
//       common: tokens.common,
//       contrastThreshold: 3,
//       ...(mode === 'light' ? tokens.light : tokens.dark)
//       // TO-DO: fill the rest with colors here, not sure what matches
//       // ERROR, WARNING, INFO, SUCCESS https://mui.com/customization/palette/
//       // https://premisedata.github.io/portal-design-system/?path=/story/design-system-tokens--colors
//     },
//     shadows: ['none', ...tokens.elevation] as ThemeOptions['shadows'],
//     typography: {
//       ...tokens.typography
//     } as TypographyOptions
//   };

//   return options;
// }

// const generateTypographies = () => {
//   const typos: Record<string, React.CSSProperties> = {};
//   Object.entries(tokens.Typography).forEach(([key, val]) => {
//     const token: Record<string, string> = {};
//     Object.entries(val).forEach(([key2, val2]) => {
//       token[key2] = val2;
//     });
//     typos[camelize(key)] = token;
//   });
//   return typos;
// };
