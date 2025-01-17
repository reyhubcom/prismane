import { ReactNode, FC, useState, useEffect } from "react";
import { getCssText } from "../../../stitches.config";
import styles from "../../index.css";
// Context
import { PrismaneContextProvider } from "./PrismaneContext";
// Themes
import { base } from "../../themes/base";
import { createTheme, applyTheme } from "../../themes/theme";
// Types
import { PrismaneInputTheme } from "../../types";

export type PrismaneProviderProps = {
  children: ReactNode;
  theme?: PrismaneInputTheme;
};

const PrismaneProvider: FC<PrismaneProviderProps> = ({
  children,
  theme = base,
}) => {
  const [current, setCurrent] = useState(createTheme(theme));

  useEffect(() => {
    applyTheme(current);
  }, [current]);

  const toggleThemeMode = () => {
    setCurrent((pt) => {
      const extended = { ...pt };

      extended.mode = pt.mode === "dark" ? "light" : "dark";

      return extended;
    });
  };

  const setTheme = (nt: PrismaneInputTheme) => {
    setCurrent(createTheme(nt));
  };

  return (
    <PrismaneContextProvider
      value={{
        theme: current,
        setTheme: setTheme,
        toggleThemeMode: toggleThemeMode,
      }}
    >
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {children}
    </PrismaneContextProvider>
  );
};

export default PrismaneProvider;
