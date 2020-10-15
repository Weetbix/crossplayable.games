import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { FilterPageQuery } from "../../graphql-types";
import { Page } from "../components/Page";
import { GameCard } from "../components/GameCard";

const Content = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
`;

type FilterPageProps = {
  data: FilterPageQuery;
};
const FilterPage = (props: FilterPageProps) => {
  const games = props.data.allGame.nodes;
  return (
    <Page>
      <Content>
        {games.map((node) => (
          <GameCard
            key={node.id}
            title={node.title}
            image={node.coverImage?.childImageSharp?.fixed}
            originalAspectRatio={
              node.coverImage?.childImageSharp?.sizes?.aspectRatio
            }
          />
        ))}
      </Content>
    </Page>
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
      nodes {
        id
        title
        coverImage {
          childImageSharp {
            fixed(width: 200, height: 267) {
              ...GatsbyImageSharpFixed
            }
            sizes {
              aspectRatio
            }
          }
        }
      }
    }
  }
`;
