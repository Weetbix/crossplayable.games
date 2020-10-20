import React from "react";
import Img, { FixedObject } from "gatsby-image";
import styled from "styled-components";

const ImagePlaceholder = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #777;
`;

// Allow images that were originally 10% away from
// the intended cover ratio.
const MAX_RATIO_DIFFERENCE = 0.15;

const shouldRenderImage = (image: FixedObject, originalRatio) =>
  image &&
  Math.abs(originalRatio - image.width / image.height) < MAX_RATIO_DIFFERENCE;

type CoverProps = {
  image: FixedObject;
  originalAspectRatio: number;
};

// Renders the cover image of a game, or the placeholder
// if the cover image was not an appropriate ratio
export const Cover = ({ image, originalAspectRatio }: CoverProps) =>
  shouldRenderImage(image, originalAspectRatio) ? (
    <Img fixed={image} />
  ) : (
    <ImagePlaceholder width={image.width} height={image.height} />
  );
