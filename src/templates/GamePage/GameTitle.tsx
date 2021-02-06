import React from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import { GameInvolved_Companies } from "../../../graphql-types";

const Content = styled.div`
  ${up("md")} {
    height: 200px;
  }
  text-shadow: 1px 1px 1px #000;
`;

type GameTitleProps = {
  title: string;
  involvedCompanies: GameInvolved_Companies[];
  firstReleaseDate: number;
  className?: string;
};
export const GameTitle = ({
  title,
  involvedCompanies,
  firstReleaseDate,
  className,
}: GameTitleProps) => (
  <Content className={className}>
    <h1>{title}</h1>
    <p>
      Developer:&nbsp;
      <span>
        {Array.from(
          new Set(
            involvedCompanies
              ?.filter((company) => company.developer)
              .map((company) => company.company.name)
          )
        ).join(", ")}
      </span>
    </p>
    <p>Released {new Date(firstReleaseDate * 1000).toDateString()}</p>
  </Content>
);
