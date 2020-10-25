import React from "react";
import Img, { FixedObject } from "gatsby-image";
import styled from "styled-components";
import { graphql } from "gatsby";
import { ImageSharpFixed } from "../../graphql-types";

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

export type CoverImage = {
  fixed?: ImageSharpFixed;
  sizes?: {
    aspectRatio: number;
  };
};
type CoverProps = {
  image: CoverImage;
  width?: number;
  height?: number;
  className?: string;
};

// Renders the cover image of a game, or the placeholder
// if the cover image was not an appropriate ratio
export const Cover = ({
  image,
  width = 200,
  height = 267,
  className = null,
}: CoverProps) =>
  shouldRenderImage(image?.fixed, image?.sizes?.aspectRatio) ? (
    <Img fixed={image.fixed} className={className} />
  ) : (
    <ImagePlaceholder width={width} height={height} className={className} />
  );

export const query = graphql`
  fragment CoverImage on Game {
    coverImage {
      childImageSharp {
        fixed(width: 200, height: 267, quality: 100) {
          ...GatsbyImageSharpFixed
        }
        sizes {
          aspectRatio
        }
      }
    }
  }
  fragment CoverImageLarge on Game {
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
  }
`;
