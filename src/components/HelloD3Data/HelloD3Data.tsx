import React, { FC, useCallback, useEffect } from "react";
import * as d3 from "d3";

// SCSS.
import "./HelloD3Data.scss";

// Components -- hello - d3 - data.
const css_prefix = "c--h-d3-d";

interface HelloD3DataProps {
  data: Array<string>;
}

export const HelloD3Data: FC<HelloD3DataProps> = ({ data }) => {
  /**
   * Draw
   * - Simple d3 function.
   */
  const draw = useCallback(() => {
    d3.select(".main")
      .selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text(d => `d3 ${d}`);
  }, [data]);

  /**
   * On mount, call draw().
   */
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}container`}>
      <div className="c--h-d3-d-main" />;
    </div>
  );
};
