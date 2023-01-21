import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import uniqBy from "lodash/uniqBy";
import styled from "styled-components";
import { IoMdHelpCircle } from "react-icons/io";
import { HomePageQuery } from "../../graphql-types";
import { GameCard } from "../components/GameCard";
import SEO from "../components/SEO";
import { AdRectangle } from "../components/adsense/AdRectangle";
import { PLATFORMS, findFilter, urlFromFilter } from "../filters";

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

  ins {
    width: 100%;
    max-width: 700px;
    margin: 16px 0;
  }
`;

const InstructionalParagraph = styled.div`
  background-color: ${(props) => props.theme.colors.text.dark};
  color: ${(props) => props.theme.colors.background.main};
  max-width: 500px;
  border-radius: 16px;
  display: flex;
  text-align: center;
  padding: 16px;
  margin-bottom: 32px;
  box-shadow: 2px 2px 7px 0px rgb(0 0 0 / 75%);
`;

const GamesWrapper = styled.div`
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SimplePlatformDropdownWrapper = styled.p`
  select {
    margin: 8px;
  }
`;

type IndexPageProps = {
  data: HomePageQuery;
};
const IndexPage = ({ data }: IndexPageProps) => {
  // We take 6 games but we use the most 3 recent and ensure the
  // names are unique, as sometimes we can have dupes
  const mostLoved = uniqBy(data.mostLoved.nodes, (game) => game.title).slice(
    0,
    3
  );
  const recentGames = uniqBy(
    data.recentGames.nodes,
    (game) => game.title
  ).slice(0, 3);

  const [platform1, setPlatform1] = useState("");
  const [platform2, setPlatform2] = useState("");

  const handleChangePlatform = (platform, value) => {
    if (platform === 1) {
      setPlatform1(value);
    } else {
      setPlatform2(value);
    }
  };

  useEffect(() => {
    if (platform1 !== "" && platform2 !== "") {
      window.location.href = urlFromFilter(findFilter([platform1, platform2]));
    }
  }, [platform1, platform2]);

  return (
    <Content>
      <SEO />
      <AdRectangle />
      <InstructionalParagraph>
        <div>
          <IoMdHelpCircle size="3em" />
        </div>
        <div>
          <p>
            <strong>How to use this site?</strong>
          </p>
          <p>
            Use the menus above to select <i>multiple</i> platforms.
            Crossplayable Games will then show you a list of games that can be
            played together on those systems.
          </p>
          <SimplePlatformDropdownWrapper>
            Alternatively, select two platforms here and hit go:
            <select
              value={platform1}
              onChange={(e) => handleChangePlatform(1, e.target.value)}
            >
              <option value="" disabled>
                Select platform 1
              </option>
              {PLATFORMS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            ↔
            <select
              value={platform2}
              onChange={(e) => handleChangePlatform(2, e.target.value)}
            >
              <option value="" disabled>
                Select platform 2
              </option>
              {PLATFORMS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </SimplePlatformDropdownWrapper>
        </div>
      </InstructionalParagraph>
      <p>
        Crossplay enabled games allow you to play online multiplayer with your
        friends across different platforms. For example, you can race your
        friend on your Switch while they play on their Playstation or Xbox.
      </p>
      <p>
        Unfortunately not every game supports crossplay, which means the choices
        are limited, but you can use this website to find out which games
        support crossplay and with which platforms.
      </p>

      <br />
      <br />
      <h3>Most Loved Cross Play Games:</h3>
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
      <h3>Most Recent Cross Play Games:</h3>
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
