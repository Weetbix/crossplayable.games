import React from 'react';
import styled from "styled-components";
import { urlFromFilter } from '../filters';

export const Wrapper = styled.a`
  && {
    background-color: ${(props) => props.theme.colors.text.main};
    color: ${(props) => props.theme.colors.background.main};
    display: inline-block;
    margin: 8px;
    padding: 2px 5px;
    border-radius: 3px;
    letter-spacing: 2px;
    font-size: 13px;
    text-transform: uppercase;
  }
  :hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }
`;

export const PlatformTag = ({platform}) => {
  // Generate a link to this platform page
  const link = urlFromFilter([platform]);

  return <Wrapper href={link}>
      {platform}
    </Wrapper>;
}
