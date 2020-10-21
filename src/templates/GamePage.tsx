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
  z-index: -10;
  div {
    height: 350px;
  }
`;

const Backdrop = styled(Img)`
  transform: scale(1.1);
  filter: blur(10px);
`;

const Content = styled.div`
  margin-top: 150px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  max-width: 700px;
  min-height: 500px;
`;

const CoverColumn = styled.div``;

const StyledCover = styled(Cover)`
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);
`;

const MainColumn = styled.div`
  flex: 1;
  padding: 0px 24px;

  h1 {
    margin-top: 0;
    text-transform: uppercase;
    text-shadow: 2px 2px 2px #000;
    letter-spacing: 5px;
    font-weight: 400;
  }
`;

type GamePageProps = {
  data: GamePageQuery;
};
const GamePage = (props: GamePageProps) => {
  const game = props.data.allGame.edges[0].node;

  return (
    <span>
      <BackdropWrapper>
        <Backdrop fluid={game.backdropImage?.childImageSharp?.fluid} />
      </BackdropWrapper>
      <Content>
        <CoverColumn>
          <StyledCover
            width={250}
            height={334}
            image={game.coverImage?.childImageSharp}
          />
        </CoverColumn>
        <MainColumn>
          <h1>{game.title}</h1>
        </MainColumn>
      </Content>
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
              fixed(width: 250, height: 334) {
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
