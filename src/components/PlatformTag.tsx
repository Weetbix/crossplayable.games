import styled from "styled-components";

export const PlatformTag = styled.span`
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
`;
