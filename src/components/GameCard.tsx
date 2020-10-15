import React from "react";
import Img, { FixedObject } from "gatsby-image";
import styled from "styled-components";

const Content = styled.div`
  padding: 16px;
  width: 200px;

  .gatsby-image-wrapper {
    box-shadow: 2px 2px 7px 0px rgba(0, 0, 0, 0.75);
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

const ImagePlaceholder = styled.div`
  width: 200px;
  height: 267px;
  background-color: #777;
`;

type GameCardProps = {
  title: string;
  image: FixedObject;
  originalAspectRatio: number;
};

// Allow images that were originally 10% away from
// the intended cover ratio.
const MAX_RATIO_DIFFERENCE = 0.15;

const shouldRenderImage = (image: FixedObject, originalRatio) =>
  image &&
  Math.abs(originalRatio - image.width / image.height) < MAX_RATIO_DIFFERENCE;

export const GameCard = ({
  title,
  image,
  originalAspectRatio,
}: GameCardProps) => (
  <Content>
    {shouldRenderImage(image, originalAspectRatio) ? (
      <Img fixed={image} />
    ) : (
      <ImagePlaceholder />
    )}
    <Title>{title}</Title>
  </Content>
);
