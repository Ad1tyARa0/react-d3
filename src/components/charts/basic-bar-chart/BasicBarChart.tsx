import React, { useCallback, useLayoutEffect } from "react";
import * as d3 from "d3";

// Data.
import { PROGRAMMING_LANGUAGES_DATA as URL } from "../../../utils/constants/data";

// SCSS.
import "./BasicBarChart.scss";
import { BarChartType } from "../../../utils/types/data";

// Components -- charts -- basic - bar - chart
const css_prefix = "c--c--b-b-c__";

// Component props.
interface BasicBarChartProps {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  accentColor: { title: string; value: string };
}

const BasicBarChartComponent: React.FunctionComponent<BasicBarChartProps> = ({
  width,
  height,
  left,
  right,
  top,
  bottom,
  accentColor,
}) => {
  const draw = useCallback(() => {
    const newWidth = width - left - right;

    const newHeight = height - top - bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);

    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(`${css_prefix}svg`)
      .attr("width", newWidth + left + right)
      .attr("height", newHeight + top + bottom)
      .select(`${css_prefix}main-g`)
      .attr("transform", `translate(${left}, ${top})`);

    d3.dsv(",", URL, d => {
      return d as unknown as BarChartType;
    }).then(data => {
      x.domain(
        data.map(d => {
          return d.language;
        })
      );

      y.domain([
        0,
        d3.max(data, d => {
          return Math.max(...data.map(dt => (dt as BarChartType).value), 0);
        }),
      ] as number[]);

      svg
        .selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", `${accentColor.value}`)
        .attr("class", "bar")
        .attr("x", d => {
          return x(d.language) || 0;
        })
        .attr("width", x.bandwidth())
        .attr("y", d => {
          return y(d.value);
        })
        .attr("height", d => {
          return height - y(d.value);
        });

      svg
        .select(`${css_prefix}x-g`)
        .attr("transfrom", `translate(0, ${height})`)
        .call(
          d3.axisBottom(x) as unknown as (
            selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
            ...args: any[]
          ) => void
        )
        .select(`${css_prefix}y-g`)
        .call(
          d3.axisLeft(y) as unknown as (
            selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
            ...args: any[]
          ) => void
        );
    });
  }, [accentColor.value, bottom, height, left, right, top, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`}>
      <svg className={`${css_prefix}svg`}>
        <g className={`${css_prefix}main-g`}>
          <g className={`${css_prefix}x-g`} />
          <g className={`${css_prefix}y-g`} />
        </g>
      </svg>
    </div>
  );
};

export const BasicBarChart = BasicBarChartComponent;
