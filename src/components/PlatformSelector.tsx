import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import styled, { css } from "styled-components";
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
  background-color: ${(props) => props.theme.colors.background.dark};
`;

const NavBarItem = styled.li<{ selected: boolean }>`
  width: 220px;
  font-size: 20px;
  font-weight: 100;
  letter-spacing: 5px;
  text-transform: uppercase;
  position: relative;

  // Text
  > a {
    display: block;
    padding: 14px 16px;
    :hover {
      text-shadow: 0px 0px 2px #fff;
      transform: scale(1.02);
      transition: all 0.3s;
    }
  }

  // Menu opening
  :hover ul,
  :focus-within ul {
    visibility: visible;
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }

  color: ${(props) => props.theme.colors.text.main};
  ${({ selected }) =>
    selected &&
    css`
      color: ${(props) => props.theme.colors.primary.light};
    `}
`;

const SubMenu = styled.ul`
  list-style: none;
  text-decoration: none;
  position: absolute;
  padding: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.dark};
  z-index: 1;
  opacity: 0;
  visibility: hidden;

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

  const isSelected = currentFilter.includes(platform);

  const link = platform
    ? urlFromFilter(togglePlatform(currentFilter, platform))
    : "#";
  return (
    <NavBarItem selected={isSelected}>
      <Link to={link} aria-haspopup={link === "#"}>
        <span>{label}</span>
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
        <NavItem label="Nintendo">
          <SubMenu aria-label="submenu">
            <NavItem label="Switch" platform="Switch" />
          </SubMenu>
        </NavItem>
        <NavItem label="Playstation">
          <SubMenu aria-label="submenu">
            <NavItem label="PS3" platform="PS3" />
            <NavItem label="PS4" platform="PS4" />
            <NavItem label="PS Now" platform="PSNow" />
          </SubMenu>
        </NavItem>
        <NavItem label="Xbox">
          <SubMenu aria-label="submenu">
            <NavItem label="Xbox" platform="XBO" />
            <NavItem label="Game Pass" platform="GamePass" />
          </SubMenu>
        </NavItem>
      </NavBar>
    </nav>
  );
};
