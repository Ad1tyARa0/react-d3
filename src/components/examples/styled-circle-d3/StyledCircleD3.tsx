import React, { useEffect } from "react";
import * as d3 from "d3";

// SCSS.
import "./StyledCircleD3.scss";

const css_prefix = "c--e--s-c-d3__";

// Component props.
interface StyledCircleD3Props {}

const StyledCircleD3Component: React.FunctionComponent<
  StyledCircleD3Props
> = () => {
  useEffect(() => {
    drawPulsatingCircle();
  }, []);

  const drawPulsatingCircle = () => {
    (function repeat() {
      d3.selectAll(".circle")
        .transition()
        .duration(300)
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0)
        .transition()
        .duration(300)
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0.5)
        .transition()
        .duration(1000)
        .attr("stroke-width", 25)
        .attr("stroke-opacity", 0)
        .ease(d3.easeSin)
        .on("end", repeat);
    })();
  };

  return (
    <div className={`${css_prefix}main`}>
      <svg>
        <circle
          className="circle"
          cx="50"
          cy="50"
          stroke="orange"
          fill="orange"
          r="8"
        />
      </svg>
    </div>
  );
};

export const StyledCircleD3 = StyledCircleD3Component;
