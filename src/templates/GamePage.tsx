import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { GamePageQuery } from "../../graphql-types";
import { Cover } from "../components/Cover";

const BackdropWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  div {
    height: 350px;
  }
`;
const Backdrop = styled(Img)`
  filter: blur(10px);
`;

type GamePageProps = {
  data: GamePageQuery;
};
const GamePage = (props: GamePageProps) => {
  const game = props.data.allGame.edges[0].node;

  return (
    <span>
      {game.title}
      <BackdropWrapper>
        <Backdrop fluid={game.backdropImage?.childImageSharp?.fluid} />
      </BackdropWrapper>
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
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
