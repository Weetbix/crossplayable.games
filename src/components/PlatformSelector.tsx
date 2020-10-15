import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import styled from "styled-components";
import { togglePlatform, urlFromFilter, filterFromUrl } from "../filters";

const NavBar = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-items: center;
  justify-content: center;
  text-align: center;
`;

const NavBarItem = styled.li`
  width: 220px;
  font-size: 20px;
  font-weight: 100;
  letter-spacing: 5px;
  text-transform: uppercase;
  position: relative;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text.main};
  }
  > a {
    display: block;
    padding: 14px 16px;
  }
  :hover ul,
  :focus-within ul {
    display: block;
  }
`;

const SubMenu = styled.ul`
  list-style: none;
  text-decoration: none;
  position: absolute;
  padding: 0;
  width: 100%;
  z-index: 1;
  display: none;
`;

const SubMenuItem = styled.li`
  a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
`;

const items = {
  PC: {
    Windows: "Windows",
    Mac: "Mac",
    Linux: "Linux",
  },
  Xbox: {
    Xbox: "XBO",
    "Game Pass": "GamePass",
  },
  Switch: "Switch",
  Playstation: {
    PS3: "PS3",
    PS4: "PS4",
    "PS Now": "PSNow",
  },
};

export const PlatformSelector = () => {
  const { pathname } = useLocation();
  const currentFilter = filterFromUrl(pathname);
  return (
    <nav>
      <NavBar>
        {Object.keys(items).map((navItem) => {
          return (
            <NavBarItem>
              {typeof items[navItem] === "string" ? (
                <Link
                  to={urlFromFilter(
                    togglePlatform(currentFilter, items[navItem])
                  )}
                >
                  {navItem}
                </Link>
              ) : (
                [
                  <a href="#" aria-haspopup="true">
                    {navItem}
                  </a>,
                  <SubMenu aria-label="submenu">
                    {Object.keys(items[navItem]).map((subItem) => {
                      return (
                        <SubMenuItem>
                          <Link
                            to={urlFromFilter(
                              togglePlatform(
                                currentFilter,
                                items[navItem][subItem]
                              )
                            )}
                          >
                            {subItem}
                          </Link>
                        </SubMenuItem>
                      );
                    })}
                  </SubMenu>,
                ]
              )}
            </NavBarItem>
          );
        })}
      </NavBar>
    </nav>
  );
};
