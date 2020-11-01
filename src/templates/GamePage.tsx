import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import { down, up } from "styled-breakpoints";
import { GamePageQuery } from "../../graphql-types";
import { Cover } from "../components/Cover";
import { PlatformTag } from "../components/PlatformTag";
import SEO from "../components/SEO";
import { ExpandableText } from "../components/ExpandableText";
import { Rating } from "../components/Rating";
import { WebsitesWithIcons } from "../components/WebsitesWithIcons";

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
  max-width: 960px;
  min-height: 500px;
  flex-direction: column;

  h4 {
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 7.5px;
    margin-top: 30px;
  }

  > div {
    display: flex;
    ${down("sm")} {
      flex-direction: column;
    }
  }
`;

const AdditionalInfo = styled.div`
  margin-top: -14px;
  display: flex;
  flex-wrap: wrap;
  > div {
    flex-basis: 50%;
  }

  ul {
    list-style: none;
    li {
      margin-top: 5px;
    }
    padding: 0;
  }
`;

const CoverColumn = styled.div`
  text-align: center;
  ${up("md")} {
    max-width: 250px;
  }
  > * {
    margin-bottom: 64px;
  }
`;

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
  const supportedPlatforms = Object.entries(game.platforms)
    .filter(([, has]) => has)
    .map(([platformName]) => platformName);

  return (
    <span>
      <SEO
        title={`Does ${game.title} support crossplay?`}
        description={`Crossplay support for ${
          game.title
        } on ${supportedPlatforms.join(", ")}`}
        keywords={game.keywords?.map((keyword) => keyword.name)}
        image={game.coverImage?.childImageSharp?.fixed?.src}
      />
      <BackdropWrapper>
        <Backdrop src={game.backdropImage?.childImageSharp?.fixed?.src} />
      </BackdropWrapper>
      <Content>
        <div>
          <CoverColumn>
            <StyledCover
              width={250}
              height={334}
              image={game.coverImage?.childImageSharp}
            />
            <Rating
              rating={game.total_rating}
              totalRatings={game.total_rating_count}
            />
            <WebsitesWithIcons websites={game.websites} />
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
                Released{" "}
                {new Date(game.first_release_date * 1000).toDateString()}
              </p>
            </div>
            <p>
              <h4>Platforms</h4>
              {supportedPlatforms.map((platformName) => (
                <PlatformTag key={platformName}>{platformName}</PlatformTag>
              ))}
            </p>
            {game.game_modes && (
              <p>
                <h4>Game Modes</h4>
                <span>
                  {game.game_modes?.map((mode) => mode.name).join(", ")}
                </span>
              </p>
            )}
            {game.summary && (
              <p>
                <h4>Description</h4>
                <ExpandableText content={game.summary} maxLength={300} />
              </p>
            )}
            {game.storyline && (
              <p>
                <h4>Storyline Summary</h4>
                <ExpandableText content={game.storyline} maxLength={300} />
              </p>
            )}
            <AdditionalInfo>
              <div>
                <h4>Genres</h4>
                <ul>
                  {game.genres?.map(({ name }) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Publishers</h4>
                <ul>
                  {game.involved_companies
                    ?.filter((company) => company.publisher)
                    .map((company) => (
                      <li key={company.company.name}>{company.company.name}</li>
                    ))}
                </ul>
              </div>
              <div>
                <h4>Themes</h4>
                <ul>
                  {game.themes?.map((theme) => (
                    <li key={theme.name}>{theme.name}</li>
                  ))}
                </ul>
              </div>
              {/* <div>
                <h4>Websites</h4>
                <ul>
                  {game.websites?.map((website) => (
                    <li key={website.url}>
                      <a href={website.url}>website</a> (category:{" "}
                      {website.category})
                    </li>
                  ))}
                </ul>
              </div> */}
            </AdditionalInfo>
          </MainColumn>
        </div>
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
          ...CoverImageLarge
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
            android
            discord
            youtube
            wikipedia
            wikia
            twitter
            twitch
            steam
            reddit
            official
            itch
            iphone
            instagram
            ipad
            gog
            facebook
            epicgames
          }
        }
      }
    }
  }
`;
