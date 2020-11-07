import React from "react";
import { graphql } from "gatsby";
import uniqBy from "lodash/uniqBy";
import styled from "styled-components";
import { FilterPageQuery } from "../../../graphql-types";
import { FilterDetails } from "./FilterDetails";
import { GameCard } from "../../components/GameCard";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GamesWrapper = styled.div`
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

  return (
    <Content>
      <FilterDetails numberOfGames={props.data.allGame.totalCount} />
      <GamesWrapper>
        {games.map((node) => (
          <GameCard
            key={node.id}
            title={node.title}
            link={node.fields.slug}
            image={node.coverImage?.childImageSharp}
          />
        ))}
      </GamesWrapper>
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
    $PSNowIncludes: [Boolean]
    $SwitchIncludes: [Boolean]
    $WindowsIncludes: [Boolean]
    $XBOIncludes: [Boolean]
  ) {
    allGame(
      filter: {
        platforms: {
          GamePass: { in: $GamePassIncludes }
          Linux: { in: $LinuxIncludes }
          Mac: { in: $MacIncludes }
          PS3: { in: $PS3Includes }
          PS4: { in: $PS4Includes }
          PSNow: { in: $PSNowIncludes }
          Switch: { in: $SwitchIncludes }
          Windows: { in: $WindowsIncludes }
          XBO: { in: $XBOIncludes }
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
