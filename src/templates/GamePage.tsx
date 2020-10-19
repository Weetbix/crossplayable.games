import React from "react";
import { graphql } from "gatsby";
import { GamePageQuery } from "../../graphql-types";

type GamePageProps = {
  data: GamePageQuery;
};
const GamePage = (props: GamePageProps) => {
  return <span>{props.data.allGame.edges[0].node.title}</span>;
};
export default GamePage;

export const query = graphql`
  query GamePage($slug: String) {
    allGame(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          title
        }
      }
    }
  }
`;
