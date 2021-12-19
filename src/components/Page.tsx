import React, { FC } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { down } from "styled-breakpoints";
import { defaultTheme } from "../theme";
import { useFilter } from "../hooks/useFilter";
import { PlatformSelector } from "./PlatformSelector";
import { Footer } from "./Footer";
import SEO from "./SEO";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background.main};
    margin: 0;
    color: ${(props) => props.theme.colors.text.main};
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 1.2;
    font-weight: 100;
    
    // Dont use thin weight for mobile, as it looks a bit too thin
    ${down("sm")} {
      font-weight: 400;
    }
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
  const currentFilter = useFilter();

  return (
    <ThemeProvider theme={defaultTheme}>
      <SEO />
      <GlobalStyles />
      {currentFilter && <PlatformSelector />}
      {children}
      <Footer />
    </ThemeProvider>
  );
};
export default Page;
