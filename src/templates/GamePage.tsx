import React from "react";
import { graphql } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import { GamePageQuery } from "../../graphql-types";

type GamePageProps = {
  data: GamePageQuery;
};
const GamePage = (props: GamePageProps) => {
  return (
    <span>
      {props.data.allGame.edges[0].node.title}
      <Img
        fixed={
          props.data.allGame.edges[0].node.backdropImage?.childImageSharp?.fixed
        }
      />
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
