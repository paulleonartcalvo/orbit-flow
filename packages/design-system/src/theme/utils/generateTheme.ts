import StyleDictionary, { TransformedTokens } from 'style-dictionary';

enum MuiThemeEnums {
  TYPOGRAPHY = 'typography',
  SHADOWS = 'elevation',
  COMMON = 'common',
  TRANSITIONS = 'transitions',
  SHADES = 'shades',
  SPACING = 'spacing',
  DURATION = 'duration',
  CONTRAST_TEXT = 'contrastText'
}

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function customMinifyDictionary(obj: TransformedTokens) {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  const toRet: Record<string, any> = {};

  if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
    obj;
    return obj.value;
  } else {
    for (const name in obj) {
      if (name.toLowerCase() === MuiThemeEnums.SHADOWS) {
        toRet[camelize(name)] = Object.values(customMinifyDictionary(obj[name])).slice(0, 24);
      } else if (
        name.toLowerCase() === 'contrast' &&
        (obj[name].path?.map((path: string) => path.toLocaleLowerCase()).includes('dark') ||
          obj[name].path?.map((path: string) => path.toLocaleLowerCase()).includes('light'))
      ) {
        toRet[MuiThemeEnums.CONTRAST_TEXT] = customMinifyDictionary(obj[name]);
      } else if (name.toLowerCase() === MuiThemeEnums.COMMON) {
        toRet[camelize(name)] = { white: '#ffffff', black: '#000000' };
      } else if (Object.prototype.hasOwnProperty.call(obj, name)) {
        if (
          Object.prototype.hasOwnProperty.call(obj[name], 'value') &&
          obj[name].path?.map((path: string) => path.toLocaleLowerCase()).includes(MuiThemeEnums.TYPOGRAPHY)
        ) {
          toRet[camelize(name.replace('-', ' '))] = customMinifyDictionary(obj[name]);
        } else {
          toRet[camelize(name.replace(/(\(.*\))+/, ''))] = customMinifyDictionary(obj[name]);
        }
      }
    }
  }
  return toRet;
}

const muiThemeDictionary = StyleDictionary.extend({
  platforms: {
    json: {
      buildPath: './src/theme/tokens/',
      files: [
        {
          filter: 'removeIncompatibles',
          destination: 'generatedTokens.json',
          format: 'muiFormat'
        }
      ],
      transforms: ['transitionDurationsToNumber', 'spacingValuesToNumber', 'pxToRem'],
      basePxFontSize: 16
    }
  },

  source: ['./src/theme/tokens/in/zeroHeightTokens.json', './src/theme/tokens/in/nonFigmaTokens.json']
});

muiThemeDictionary.registerFilter({
  name: 'removeIncompatibles',
  matcher: (token) => {
    // Exclude dark colors
    const lowerPath = token.path.map((path) => path.toLowerCase());

    // Exclude "shades" since they are not in the theme
    if (lowerPath.includes(MuiThemeEnums.SHADES) || lowerPath.includes('display')) {
      return false;
    }

    return true;
  }
});

muiThemeDictionary.registerFormat({
  name: 'muiFormat',
  formatter: function ({ dictionary }) {
    return JSON.stringify(customMinifyDictionary(dictionary.tokens), null, 2);
  }
});

muiThemeDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `transitionDurationsToNumber`,
  matcher: (token) => {
    const lowerCasePath = token.path.map((path) => path.toLowerCase());
    if (lowerCasePath.includes(MuiThemeEnums.TRANSITIONS) && lowerCasePath.includes(MuiThemeEnums.DURATION)) {
      return true;
    }
    return false;
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    const num = parseInt(token.value);
    if (num !== undefined) {
      return num;
    }
    return token.value;
  }
});

muiThemeDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `pxToRem`,
  matcher: (token) => {
    const lowerCasePath = token.path.map((path) => path.toLowerCase());
    if (
      lowerCasePath.includes(MuiThemeEnums.TYPOGRAPHY) &&
      typeof token.value === 'string' &&
      token.value.endsWith('px')
    ) {
      return true;
    }
    return false;
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    const lowerCasePath = token.path.map((path) => path.toLowerCase());

    const stripped = (token.value as string).replace('px', '');

    const num = parseFloat(stripped);

    return `${num / 16}${lowerCasePath.includes('letter-spacing') ? 'em' : 'rem'}`;
  }
});

muiThemeDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `pxToRem`,
  matcher: (token) => {
    const lowerCasePath = token.path.map((path) => path.toLowerCase());
    if (lowerCasePath.includes('font-family')) {
      return true;
    }
    return false;
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    const stringified = String(token.value);

    return stringified.replace('Proxima Nova', 'proxima-nova');
  }
});

muiThemeDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `spacingValuesToNumber`,
  matcher: (token) => {
    const lowerCasePath = token.path.map((path) => path.toLowerCase());
    if (lowerCasePath.includes(MuiThemeEnums.SPACING)) {
      return true;
    }
    return false;
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    const num = parseFloat(token.value);
    if (num !== undefined) {
      return num;
    }
    return token.value;
  }
});

muiThemeDictionary.buildAllPlatforms();
