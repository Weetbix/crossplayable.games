import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Content = styled.div`
  width: 150px;
  margin-right: auto;
  margin-left: auto;

  .CircularProgressbar-path {
    stroke: ${(props) => props.theme.colors.primary.main};
  }
  .CircularProgressbar-trail {
    stroke: #000;
  }
`;

const RatingText = styled.div`
  font-size: 50px;
`;

const RatingSubtext = styled.div`
  font-size: 8px;
`;

type RatingProps = {
  rating?: number;
  totalRatings?: number;
};
export const Rating = ({ rating, totalRatings }: RatingProps) => {
  // Delay setting the value until first render, so the
  // rating path animates
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(rating);
  }, []);

  return (
    <Content>
      <CircularProgressbarWithChildren value={value} strokeWidth={4}>
        {rating ? (
          <>
            <RatingText>{rating.toFixed(0)}</RatingText>
            <RatingSubtext> from {totalRatings} ratings</RatingSubtext>
          </>
        ) : (
          <>
            <RatingText>?</RatingText>
            <RatingSubtext>Rating not available</RatingSubtext>
          </>
        )}
      </CircularProgressbarWithChildren>
    </Content>
  );
};
