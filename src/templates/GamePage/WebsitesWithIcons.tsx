import React from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { GameWebsites } from "../../../graphql-types";

import {
  FaYoutube,
  FaFacebook,
  FaDiscord,
  FaWikipediaW,
  FaTwitter,
  FaTwitch,
  FaSteam,
  FaReddit,
  FaInstagram,
} from "react-icons/fa";
import { SiFandom } from "react-icons/si";
import { IconType } from "react-icons/lib";

const Content = styled.div`
  text-align: left;
  display: flex;

  ${up("md")} {
    justify-content: center;
  }
`;

const Center = styled.span``;

const WebsiteContainer = styled.a`
  display: flex;
  align-items: center;
  > * {
    margin-right: 16px;
  }
  margin-bottom: 16px;
  text-transform: capitalize;
`;

type WebsiteProps = {
  Icon: IconType;
  name: string;
  url: string;
};

const Website = ({ Icon, name, url }: WebsiteProps) => (
  <WebsiteContainer
    href={url}
    aria-label={`view the ${name} website for this game`}
  >
    <Icon size="1.5em" /> {name}
  </WebsiteContainer>
);

const nameMap = {
  wikia: "fandom",
};

const iconMap = {
  youtube: FaYoutube,
  facebook: FaFacebook,
  discord: FaDiscord,
  wikipedia: FaWikipediaW,
  twitter: FaTwitter,
  twitch: FaTwitch,
  steam: FaSteam,
  reddit: FaReddit,
  instagram: FaInstagram,
  wikia: SiFandom,
};

type WebsitesWithIconsProps = {
  websites: GameWebsites;
  className?: string;
};

export const WebsitesWithIcons = ({
  websites,
  className,
}: WebsitesWithIconsProps) => {
  return (
    <Content className={className}>
      <Center>
        {Object.entries(websites)
          .filter(([key]) => iconMap[key])
          .filter(([, value]) => value)
          .map(([key, value]) => (
            <Website
              Icon={iconMap[key]}
              name={nameMap[key] ?? key}
              url={value}
            />
          ))}
      </Center>
    </Content>
  );
};
