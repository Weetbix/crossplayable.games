import React from "react";
import { graphql } from "gatsby";
import uniqBy from "lodash/uniqBy";
import styled from "styled-components";
import { HomePageQuery } from "../../graphql-types";
import { GameCard } from "../components/GameCard";
import SEO from "../components/SEO";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    max-width: 700px;
    padding-left: 24px;
    padding-right: 24px;
    line-height: 20px;
    text-align: justify;
  }
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
  // We take 6 games but we use the most 3 recent and ensure the
  // names are unique, as sometimes we can have dupes
  const mostLoved = uniqBy(data.mostLoved.nodes, (game) => game.title).slice(0,3);
  const recentGames = uniqBy(data.recentGames.nodes, (game) => game.title).slice(0,3);

  return (
    <Content>
      <SEO />
      <p>
        Crossplay enabled games allow you to play online multiplayer with your
        friends across different platforms. For example, you can race your
        friend on your Switch while they play on their Playstation.
      </p>
      <p>
        Unfortunately not every game supports crossplay, which means the choices
        are limite, but you can use this website to find out which games support
        crossplay and with which platforms.
      </p>
      <p>
        <strong>To start, </strong>select multiple platforms to see which games
        support crossplay on those systems
      </p>
      <br />
      <br />
      <h3>Most Loved Games:</h3>
      <GamesWrapper data-testid="most-loved-games">
        {mostLoved.map((node) => (
          <GameCard
            key={node.id}
            title={node.title}
            link={node.fields.slug}
            image={node.coverImage?.childImageSharp}
          />
        ))}
      </GamesWrapper>
      <h3>Most Recent Games:</h3>
      <GamesWrapper data-testid="most-recent-games">
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
    recentGames: allGame(
      sort: { fields: first_release_date, order: DESC }
      limit: 6
      filter: { first_release_date: { ne: null } }
    ) {
      nodes {
        id
        title
        fields {
          slug
        }
        ...CoverImage
      }
    }
    mostLoved: allGame(
      sort: { fields: total_rating, order: DESC }
      limit: 6
      filter: { total_rating: { ne: null }, total_rating_count: { gt: 100 } }
    ) {
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
