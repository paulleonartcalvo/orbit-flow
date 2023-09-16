import { createTheme, Theme } from "@mui/material/styles";
import { verdigoThemeOptions } from "./printedTheme.js";
import verdigoOverrides from "./overrides/index.js";

export { Spacings } from "./printedTheme.js";
export function themeGenerator(mode: Theme["palette"]["mode"]) {
  return createTheme({
    components: verdigoOverrides,
    ...verdigoThemeOptions(mode),
  });
}

// // type CustomColors = Record<keyof typeof tokens.light, PaletteOptions['primary']>;
// type CustomColors = {
//   [key in keyof typeof tokens.light]: (typeof tokens.light)[key];
// };
// type CustomTypographies = Record<keyof typeof tokens.typography, FontStyle>;
// // type CustomTypographies = {
// //   [key in keyof typeof tokens.typography]: Partial<Record<Variant, TypographyStyleOptions> & FontStyleOptions>;
// // };
// type CustomTypographyBooleans = { [key in keyof CustomTypographies]: true };
// type CustomLayouts = typeof tokens.webLayout;
// declare module '@mui/material/styles' {
//   interface Theme {
//     layout?: CustomLayouts;
//   }
//   interface ThemeOptions {
//     layout?: CustomLayouts;
//   }

//   interface TypographyVariants extends CustomTypographies {}

//   interface Palette extends CustomColors {}
//   // interface PaletteOptions extends CustomColors {}
// }

// declare module '@mui/material/Typography' {
//   interface TypographyPropsVariantOverrides extends CustomTypographyBooleans {}
// }
