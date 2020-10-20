import React from "react";
import { FixedObject } from "gatsby-image";
import styled from "styled-components";
import { Link } from "gatsby";
import { Cover } from "./Cover";

const StyledLink = styled(Link)`
  margin: 16px;
  width: 200px;

  .gatsby-image-wrapper {
    box-shadow: 2px 2px 7px 0px rgba(0, 0, 0, 0.75);
  }

  transition: all 0.1s ease-in;
  &:hover {
    transform: scale(1.03);
    transition: all 0.1s ease-in;
    .gatsby-image-wrapper {
      box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.75);
    }
  }
`;

const Title = styled.div`
  text-align: center;
  letter-spacing: 2px;
  font-weight: 100;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;

type GameCardProps = {
  title: string;
  image: FixedObject;
  link: string;
  originalAspectRatio: number;
};

export const GameCard = ({
  title,
  image,
  originalAspectRatio,
  link,
}: GameCardProps) => (
  <StyledLink to={link}>
    <Cover image={image} originalAspectRatio={originalAspectRatio} />
    <Title>{title}</Title>
  </StyledLink>
);
