import React from "react";
import styled from "styled-components";

const FooterContainer = styled.ul`
  padding: 0;
  padding-top: 150px;
  padding-bottom: 30px;
  text-align: center;
  list-style: none;
  text-transform: uppercase;
  font-size: 10px;
  color: ${(props) => props.theme.colors.text.dark};
  li {
    margin-right: 30px;
  }
  li:last-child {
    margin-right: 0;
  }
`;

const FooterItem = styled.li`
  display: inline;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterItem>Made with ♥ in Berlin</FooterItem>
      <FooterItem>
        <a href="https://github.com/Weetbix/crossplayable.games">Github</a>
      </FooterItem>
      <FooterItem>
        <a href="/privacy-policy">Privacy</a>
      </FooterItem>
    </FooterContainer>
  );
};
