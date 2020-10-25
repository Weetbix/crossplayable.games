import React from "react";
import styled from "styled-components";
import { useFilter } from "../hooks/useFilter";
import SEO from "./SEO";

const Content = styled.div`
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 13px;
  text-transform: uppercase;
  text-align: center;
  color: ${(props) => props.theme.colors.text.dark};
  margin-bottom: 50px;
`;

const Platform = styled.span`
  background-color: ${(props) => props.theme.colors.text.main};
  color: ${(props) => props.theme.colors.background.main};
  display: inline-block;
  margin: 8px;
  padding: 2px 5px;
  border-radius: 3px;
`;

type FilterDetailsProps = {
  numberOfGames: number;
};

export const FilterDetails = ({ numberOfGames }: FilterDetailsProps) => {
  const currentFilter = useFilter();
  const startText =
    numberOfGames === 0
      ? "Unfortunately, there are no games"
      : numberOfGames > 1
      ? `${numberOfGames} games`
      : `${numberOfGames} game`;

  return (
    <Content>
      <SEO title={`Crossplayable games on ${currentFilter.join(", ")}`} />
      <span>{startText} cross-playable with:</span>
      <div>
        {currentFilter.map((platform) => (
          <Platform>{platform}</Platform>
        ))}
      </div>
    </Content>
  );
};
