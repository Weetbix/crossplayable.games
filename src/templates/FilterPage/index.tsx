import React from "react";
import { graphql } from "gatsby";
import uniqBy from "lodash/uniqBy";
import styled from "styled-components";
import { FilterPageQuery } from "../../../graphql-types";
import { chunk } from "../../utils";
import { FilterDetails } from "./FilterDetails";
import { GameCard } from "../../components/GameCard";
import { AdRectangle } from "../../components/adsense/AdRectangle";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GamesWrapper = styled.p`
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type FilterPageProps = {
  data: FilterPageQuery;
};
const FilterPage = (props: FilterPageProps) => {
  // Due to games having different 'sets' of platforms, we can
  // have 2 games in the list with the same name, but different
  // platform sets (Aragami). Here we should only show 1 of those.
  const games = uniqBy(props.data.allGame.nodes, (game) => game.title);

  // Chunk so we can group by paragraph and give adsense a
  // better shot at auto inserting ads.
  const chunkedGames = chunk(games, 6);

  return (
    <Content>
      <FilterDetails numberOfGames={games.length} />
      <div data-testid="game-results">
        <AdRectangle />
        {chunkedGames.map((chunk) => (
          <GamesWrapper>
            {chunk.map((node, i) => (
              <GameCard
                key={node.id}
                title={node.title}
                link={node.fields.slug}
                image={node.coverImage?.childImageSharp}
              />
            ))}
          </GamesWrapper>
        ))}
      </div>
    </Content>
  );
};
export default FilterPage;

export const query = graphql`
  query FilterPage(
    $GamePassIncludes: [Boolean]
    $LinuxIncludes: [Boolean]
    $MacIncludes: [Boolean]
    $PS3Includes: [Boolean]
    $PS4Includes: [Boolean]
    $PS5Includes: [Boolean]
    $PlaystationPlusIncludes: [Boolean]
    $SwitchIncludes: [Boolean]
    $WindowsIncludes: [Boolean]
    $XboxIncludes: [Boolean]
  ) {
    allGame(
      filter: {
        platforms: {
          GamePass: { in: $GamePassIncludes }
          Linux: { in: $LinuxIncludes }
          Mac: { in: $MacIncludes }
          PS3: { in: $PS3Includes }
          PS4: { in: $PS4Includes }
          PS5: { in: $PS5Includes }
          PlaystationPlus: { in: $PlaystationPlusIncludes }
          Switch: { in: $SwitchIncludes }
          Windows: { in: $WindowsIncludes }
          Xbox: { in: $XboxIncludes }
        }
      }
    ) {
      totalCount
      nodes {
        id
        title
        fields {
          slug
        }
        ...CoverImage
      }
    }
  }
`;
