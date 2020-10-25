import React from "react";
import { graphql } from "gatsby";
import uniqBy from "lodash/uniqBy";
import styled from "styled-components";
import { HomePageQuery } from "../../graphql-types";
import { GameCard } from "../components/GameCard";

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

type IndexPageProps = {
  data: HomePageQuery;
};
const IndexPage = ({ data }: IndexPageProps) => {
  const recentGames = uniqBy(data.allGame.nodes, (game) => game.title);

  return (
    <Content>
      <p>
        Select multiple platforms to see which games support crossplay on those
        systems
      </p>
      <br />
      <br />
      <h3>Most Recent Games:</h3>
      <GamesWrapper>
        {recentGames.map((node) => (
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
export default IndexPage;

export const query = graphql`
  query HomePage {
    allGame(
      sort: { fields: first_release_date, order: DESC }
      limit: 3
      filter: { first_release_date: { ne: null } }
    ) {
      nodes {
        id
        title
        fields {
          slug
        }
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
