import React, { FC } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme } from "../theme";
import { PlatformSelector } from "./PlatformSelector";
import { Footer } from "./Footer";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background.main};
    margin: 0;
    color: ${(props) => props.theme.colors.text.main};
    font-family: Helvetica, Arial, sans-serif
  }

  a, a:visited, a:link { 
      color: inherit;
      text-decoration: none;
  }
  a:hover {
    color: ${(props) => props.theme.colors.primary.main}
  }

  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }
  div[role="group"][tabindex] {
    height: 100%;
  }
`;

const Page: FC<{}> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <PlatformSelector />
      {children}
      <Footer />
    </ThemeProvider>
  );
};
export default Page;
