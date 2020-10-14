import "styled-components";
import { DefaultTheme } from "styled-components";
import Color from "color";

type SteppableThemeColor = {
  main: string;
  light: string;
  dark: string;
};

const steppedColor = (color: string): SteppableThemeColor => ({
  main: color,
  light: Color(color).lighten(0.25).hex(),
  dark: Color(color).darken(0.25).hex(),
});

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: SteppableThemeColor;
      secondary: SteppableThemeColor;
      background: string;
    };
  }
}

export const defaultTheme: DefaultTheme = {
  colors: {
    primary: steppedColor("yellow"),
    secondary: steppedColor("orange"),
    background: "#111111",
  },
};
