import "styled-components";
import { DefaultTheme } from "styled-components";

function adjust(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

type SteppableThemeColor = {
  main: string;
  light: string;
  dark: string;
};

const steppedColor = (
  color: string,
  stepAmount: number = 25
): SteppableThemeColor => ({
  main: color,
  light: adjust(color, stepAmount),
  dark: adjust(color, -stepAmount),
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
    secondary: steppedColor("#ffa500"),
    text: steppedColor("#EEEEEE"),
    background: steppedColor("#222222", 15),
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};
