import React, { useCallback, useLayoutEffect } from "react";
import * as d3 from "d3";

// SCSS.
import "./BasicAreaChart.scss";
import { BasicChartDataType } from "../../../utils/types/data";

const URL =
  "https://gist.githubusercontent.com/Ad1tyARa0/098d6579f640f133d0054db0fc635ebc/raw/BTC-USD.csv";

const css_prefix = "c--c--b-a-c__";

// Component props.
interface BasicAreaChartProps {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  fill: string;
}

const BasicAreaChartComponent: React.FunctionComponent<BasicAreaChartProps> = ({
  width,
  height,
  left,
  right,
  top,
  bottom,
  fill,
}) => {
  const draw = useCallback(() => {
    const newWidth = width - left - right;

    const newHeight = height - top - bottom;

    const svg = d3
      .select(`${css_prefix}main`)
      .append("svg")
      .attr("width", newWidth + left + right)
      .attr("height", newHeight + top + bottom)
      .append("g")
      .attr("transform", `translate(${left}, ${top})`);

    d3.dsv(",", URL, d => {
      const res = d as unknown as BasicChartDataType;
      const date = d3.timeParse("%Y-%m-%d")(res.date);

      return {
        date,
        value: res.value,
      };
    }).then(function results(data) {
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, d => {
            return d.date;
          }) as [Date, Date]
        )
        .range([0, newWidth]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        // @ts-ignore
        .domain([
          0,
          d3.max(data, d => {
            return +d.value;
          }),
        ] as number[])
        .range([newHeight, 0]);

      svg.append("g").call(d3.axisLeft(y));

      svg
        .append("path")
        .datum(data)
        .attr("fill", fill)
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          //@ts-ignore
          d3
            .area()
            .curve(d3.curveLinear)
            .x(d => {
              return x((d as unknown as { date: number }).date);
            })
            .y0(y(0))
            .y1(d => {
              return y((d as unknown as { value: number }).value);
            })
        );
    });
  }, [bottom, fill, height, left, right, top, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return <div className={`${css_prefix}main`} />;
};

export const BasicAreaChart = BasicAreaChartComponent;
