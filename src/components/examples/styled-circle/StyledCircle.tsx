import React from "react";
import styled, { keyframes } from "styled-components";

// SCSS.
import "./StyledCircle.scss";

const circlePulse = (colorOne: string, colorTwo: string) => keyframes`
    0% {
     fill:${colorOne};
     stroke-width:20px
    }
    50% {
     fill:${colorTwo};
     stroke-width:2px
    }
    100%{
     fill:${colorOne};
     stroke-width:20px
    }`;

const StyledInnerCircle = styled.circle`
  animation: ${() => circlePulse("rgb(245,197,170)", "rgba(242, 121, 53, 1)")}
    infinite 4s linear;
`;

// Components -- example -- styled - circle
const css_prefix = "c--e--s-c__";

// Component props.
interface StyledCircleProps {
  cx: number;
  cy: number;
}

const StyledCircleComponent: React.FunctionComponent<StyledCircleProps> = ({
  cx,

  cy,
}) => {
  return (
    <>
      <StyledInnerCircle
        cx={cx}
        cy={cy}
        r="8"
        stroke="limegreen"
        stroke-width="5"
      />
    </>
  );
};

export const StyledCircle = StyledCircleComponent;
