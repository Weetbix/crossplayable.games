import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { GamePageQuery } from "../../graphql-types";
import { Cover } from "../components/Cover";

const BackdropWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: -10;
  height: 350px;
`;

const Backdrop = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

  > div {
    height: 200px;
    text-shadow: 1px 1px 1px #000;
  }

  h1 {
    margin-top: 0;
    text-transform: uppercase;
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
        <Backdrop src={game.backdropImage?.childImageSharp?.fixed?.src} />
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
          <div>
            <h1>{game.title}</h1>
            <p>
              Developer:
              <span>
                {Array.from(
                  new Set(
                    game.involved_companies
                      ?.filter((company) => company.developer)
                      .map((company) => company.company.name)
                  )
                ).join(", ")}
              </span>
            </p>
            <p>
              Released {new Date(game.first_release_date * 1000).toDateString()}
            </p>
          </div>

          <p>
            Genres:
            <ul>
              {game.genres?.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
            </ul>
          </p>
          <p>
            Publishers:
            <ul>
              {" "}
              {game.involved_companies
                ?.filter((company) => company.publisher)
                .map((company) => (
                  <li key={company.company.name}>{company.company.name}</li>
                ))}
            </ul>
          </p>
          <p>
            External critic scores: {game.aggregated_rating?.toFixed(0)} (from{" "}
            {game.aggregated_rating_count} total ratings)
          </p>
          <p>
            IGDB rating: {game.rating?.toFixed(0)} (from {game.rating_count}{" "}
            total ratings)
          </p>
          <p>
            Total rating: {game.total_rating?.toFixed(0)} (from{" "}
            {game.total_rating_count} total ratings)
          </p>
          <p>
            Summary:
            {game.summary}
          </p>
          <p>
            Storyline:
            {game.storyline}
          </p>
          <p>
            Keywords:
            {game.keywords?.map((keyword) => keyword.name).join(", ")}
          </p>
          <p>
            Platforms:
            <ul>
              {Object.entries(game.platforms)
                .filter(([, has]) => has)
                .map(([platformName]) => (
                  <li key={platformName}>{platformName}</li>
                ))}
            </ul>
          </p>
          <p>
            Game modes:
            <ul>
              {game.game_modes?.map((mode) => (
                <li key={mode.name}>{mode.name}</li>
              ))}
            </ul>
          </p>
          <p>
            Themes:
            <ul>
              {game.themes?.map((theme) => (
                <li key={theme.name}>{theme.name}</li>
              ))}
            </ul>
          </p>
          <p>
            Websites:
            <ul>
              {game.websites?.map((website) => (
                <li key={website.url}>
                  <a href={website.url}>{website.url}</a> (category:{" "}
                  {website.category})
                </li>
              ))}
            </ul>
          </p>
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
              fixed(width: 250, height: 334, quality: 100) {
                ...GatsbyImageSharpFixed
              }
              sizes {
                aspectRatio
              }
            }
          }
          backdropImage {
            childImageSharp {
              fixed(width: 150) {
                src
              }
            }
          }
          aggregated_rating
          aggregated_rating_count
          first_release_date
          game_modes {
            name
          }
          genres {
            name
          }
          involved_companies {
            publisher
            developer
            company {
              name
              websites {
                url
                category
              }
            }
          }
          keywords {
            name
          }
          platforms {
            GamePass
            Linux
            Mac
            PS3
            PS4
            Switch
            PSNow
            XBO
            Windows
          }
          rating
          rating_count
          storyline
          summary
          themes {
            name
          }
          total_rating
          total_rating_count
          websites {
            category
            url
          }
        }
      }
    }
  }
`;
