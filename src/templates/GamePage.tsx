import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { GamePageQuery } from "../../graphql-types";
import { Cover } from "../components/Cover";

type GamePageProps = {
  data: GamePageQuery;
};
const GamePage = (props: GamePageProps) => {
  const game = props.data.allGame.edges[0].node;

  return (
    <span>
      {game.title}
      <Img fixed={game.backdropImage?.childImageSharp?.fixed} />
      <Cover image={game.coverImage?.childImageSharp} />
    </span>
  );
};
export default GamePage;

export const query = graphql`
  query GamePage($slug: String) {
    allGame(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
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
          backdropImage {
            childImageSharp {
              fixed(width: 500) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
