// Theme
import { transformColor } from "../themes/theme";
// Hooks
import useTheme from "./useTheme";
// Globals
import {
  PRISMANE_COLORS,
  PRISMANE_COLORS_MAP,
  PRISMANE_SHADES_MAP,
} from "../constants";
// Types
import { PrismaneColors, PrismaneShades, PrismaneTheme } from "../types";
// Utils
import { parse } from "../utils";

const useColor = () => {
  const { theme } = useTheme();

  const colors: any = {
    ...PRISMANE_COLORS,
    primary: theme.colors.primary,
    base: theme.colors.base,
  };

  const getColor = (cl: PrismaneColors | string, shade?: PrismaneShades) => {
    if (PRISMANE_COLORS_MAP.includes(cl)) {
      if (shade) {
        return colors[cl][shade];
      } else {
        return colors[cl][500];
      }
    } else {
      return cl;
    }
  };

  const getColorStyle = (cl: any | ((theme: PrismaneTheme) => any)) =>
    parse(typeof cl === "function" ? cl(theme) : cl, (v: any) => {
      if (
        Array.isArray(v) &&
        PRISMANE_COLORS_MAP.includes(v[0]) &&
        PRISMANE_SHADES_MAP.includes(v[1])
      ) {
        const opacity = v[2] || 1;

        return `rgba(${transformColor(colors[v[0]][v[1]])} / ${opacity})`;
      } else if (typeof v === "string" && PRISMANE_COLORS_MAP.includes(v)) {
        return `rgba(${transformColor(colors[v][500])} / 1)`;
      } else {
        return v;
      }
    });

  return { getColor, getColorStyle };
};

export default useColor;