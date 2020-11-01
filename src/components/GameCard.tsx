import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Cover, CoverImage } from "./Cover";

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
  font-size: 16px;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;

type GameCardProps = {
  title: string;
  image: CoverImage;
  link: string;
};

export const GameCard = ({ title, image, link }: GameCardProps) => (
  <StyledLink to={link}>
    <Cover image={image} />
    <Title>{title}</Title>
  </StyledLink>
);
