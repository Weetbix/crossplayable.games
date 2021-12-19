import React from 'react';
import styled from "styled-components";
import { MdCancel } from "react-icons/md";
import { useFilter } from '../hooks/useFilter';
import { togglePlatform, urlFromFilter } from '../filters';

const Wrapper = styled.span`
  background-color: ${(props) => props.theme.colors.text.main};
  color: ${(props) => props.theme.colors.background.main};
  display: inline-block;
  margin: 8px;
  padding: 2px 5px;
  border-radius: 3px;
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 13px;
  text-transform: uppercase;
  a {
    // cursor: pointer;
    display: flex;
    align-items: center;
    :hover {
      color: ${(props) => props.theme.colors.background.main};
    }
  }

  :hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }
`;

export const RemovablePlatformTag = ({ platform }) => {
  // Generate a link with this filter removed
  const currentFilter = useFilter();
  const link = platform
    ? urlFromFilter(togglePlatform(currentFilter, platform))
    : "#";

  return <Wrapper>
    <a href={link}>{platform}<MdCancel /></a>
  </Wrapper>;
}