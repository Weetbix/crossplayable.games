import React, { FC } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme } from "../theme";
import { PlatformSelector } from "./PlatformSelector";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
  }
`;

export const Page: FC<{}> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <PlatformSelector />
      {children}
    </ThemeProvider>
  );
};
