import React from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import { up, down } from "styled-breakpoints";
import { useFilter } from "../hooks/useFilter";
import { togglePlatform, urlFromFilter } from "../filters";

const MobileHeader = styled.li`
  ${up("md")} {
    display: none;
  }
  font-size: 10px;
  margin: 20px;
`;

const NavBar = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-items: center;
  justify-content: center;
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.colors.background.dark};

  border-bottom: 1px solid;
  border-image: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.background.main},
    ${(props) => props.theme.colors.primary.main},
    ${(props) => props.theme.colors.background.main}
  ) 1;

  text-align: center;
  font-size: 20px;
  letter-spacing: 5px;
  text-transform: uppercase;

  ${down("sm")} {
    flex-direction: column;
    padding-bottom: 20px;
  }
`;

const NavBarItem = styled.li<{ selected: boolean }>`
  position: relative;

  ${up("md")} {
    width: 220px;
  }

  // Text
  > a {
    ${down("sm")} {
      display: none;
    }
    display: block;
    padding: 14px 16px;
    :hover {
      color: inherit;
      text-shadow: 0px 0px 2px #fff;
      transform: scale(1.02);
      transition: all 0.3s;
    }
  }

  // Menu opening
  :hover ul {
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
  background-color: ${(props) => props.theme.colors.background.dark};
  list-style: none;
  padding: 0;
  width: 100%;
  z-index: 1;

  ${up("md")} {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }

  > li {
    a {
      padding: 12px 16px;
      display: block;
    }
  }
`;

type NavItemProps = {
  label: string;
  platform?: string;
};

const NavItem: React.FC<NavItemProps> = ({ label, platform, children }) => {
  const currentFilter = useFilter();
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
        <MobileHeader>Combine your platforms:</MobileHeader>
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
            <NavItem label="PS5" platform="PS5" />
            <NavItem label="PS Now" platform="PSNow" />
          </SubMenu>
        </NavItem>
        <NavItem label="Xbox">
          <SubMenu aria-label="submenu">
            <NavItem label="Xbox" platform="Xbox" />
            <NavItem label="Game Pass" platform="GamePass" />
          </SubMenu>
        </NavItem>
      </NavBar>
    </nav>
  );
};
