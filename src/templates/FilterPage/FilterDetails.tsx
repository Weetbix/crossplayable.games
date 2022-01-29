import React from "react";
import styled from "styled-components";
import { useFilter } from "../../hooks/useFilter";
import { RemovablePlatformTag } from "../../components/RemovablePlatformTag";
import SEO from "../../components/SEO";

const Content = styled.div`
  letter-spacing: 2px;
  font-size: 13px;
  text-transform: uppercase;
  text-align: center;
  color: ${(props) => props.theme.colors.text.dark};
  margin-bottom: 50px;
`;

type FilterDetailsProps = {
  numberOfGames: number;
};

export const FilterDetails = ({ numberOfGames }: FilterDetailsProps) => {
  const currentFilter = useFilter();
  const startText =
    numberOfGames === 0
      ? "Unfortunately, there are no games that support"
      : numberOfGames > 1
      ? `${numberOfGames} games support`
      : `${numberOfGames} game supports`;

  return (
    <Content>
      <SEO
        title={`Games with crossplay on ${currentFilter.join(", ")}`}
        description={`there are ${numberOfGames} games that support crossplay on these systems: ${currentFilter.join(
          ", "
        )}`}
      />
      <span data-testid="total-games-support">
        {startText} crossplay on these platforms:
      </span>
      <div>
        {currentFilter.map((platform) => (
          <RemovablePlatformTag platform={platform} key={String(platform)} />
        ))}
      </div>
    </Content>
  );
};
