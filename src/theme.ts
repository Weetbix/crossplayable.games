import "styled-components";
import { DefaultTheme } from "styled-components";
import Color from "color";

type SteppableThemeColor = {
  main: string;
  light: string;
  dark: string;
};

const steppedColor = (
  color: string,
  stepAmount: number = 0.25
): SteppableThemeColor => ({
  main: color,
  light: Color(color).lighten(stepAmount).hex(),
  dark: Color(color).darken(stepAmount).hex(),
});

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: SteppableThemeColor;
      secondary: SteppableThemeColor;
      text: SteppableThemeColor;
      background: SteppableThemeColor;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

export const defaultTheme: DefaultTheme = {
  colors: {
    primary: steppedColor("#F8D200"),
    secondary: steppedColor("orange"),
    text: steppedColor("#EEE"),
    background: steppedColor("#222", 0.15),
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};
