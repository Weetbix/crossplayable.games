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
  margin-bottom: 32px;
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

  > li {
    a {
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
  }
`;

type NavItemProps = {
  label: string;
  platform?: string;
};

const NavItem: React.FC<NavItemProps> = ({ label, platform, children }) => {
  const { pathname } = useLocation();
  const currentFilter = filterFromUrl(pathname);

  const link = platform
    ? urlFromFilter(togglePlatform(currentFilter, platform))
    : "#";
  return (
    <NavBarItem>
      <Link to={link} aria-haspopup={link === "#"}>
        {label}
      </Link>
      {children}
    </NavBarItem>
  );
};

export const PlatformSelector = () => {
  return (
    <nav>
      <NavBar>
        <NavItem label="PC">
          <SubMenu aria-label="submenu">
            <NavItem label="Windows" platform="Windows" />
            <NavItem label="Linux" platform="Linux" />
            <NavItem label="Mac" platform="Mac" />
          </SubMenu>
        </NavItem>
        <NavItem label="Xbox">
          <SubMenu aria-label="submenu">
            <NavItem label="Xbox" platform="XBO" />
            <NavItem label="Game Pass" platform="GamePass" />
          </SubMenu>
        </NavItem>
        <NavItem label="Switch" platform="Switch" />
        <NavItem label="Playstation">
          <SubMenu aria-label="submenu">
            <NavItem label="PS3" platform="PS3" />
            <NavItem label="PS4" platform="PS4" />
            <NavItem label="PS Now" platform="PSNow" />
          </SubMenu>
        </NavItem>
      </NavBar>
    </nav>
  );
};
