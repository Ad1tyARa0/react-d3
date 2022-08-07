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
  accentColor: { value: string; title: string };
}

const BasicAreaChartComponent: React.FunctionComponent<BasicAreaChartProps> = ({
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

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr("width", newWidth + left + right)
      .attr("height", newHeight + top + bottom)
      .select(`.${css_prefix}main-g`)
      .attr("transofrm", `translate(${left}, ${top})`);

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
        .select(`.${css_prefix}x-g`)
        .attr("transform", `translate(50, ${newHeight})`)
        .call(
          d3.axisBottom(x) as unknown as (
            selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
            ...args: any[]
          ) => void
        );

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

      svg
        .select(`.${css_prefix}y-g`)
        .attr("transform", `translate(${left}, 0)`)
        .call(
          d3.axisLeft(y) as unknown as (
            selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
            ...args: any[]
          ) => void
        );

      svg
        .select(`.${css_prefix}path`)
        .datum(data)
        .attr("fill", `${accentColor.value}`)
        .attr("transform", `translate(50, 300)`)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .attr("transform", `translate(50, 0)`)
        .attr("stroke", `${accentColor.value}`)
        .attr("stroke-width", 0.3)
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
  }, [accentColor.value, bottom, height, left, right, top, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`}>
      <div
        className={`${css_prefix}title ${css_prefix}title-${accentColor.title}`}
      >
        Bitcoin price data ( July 2022 )
      </div>

      <svg className={`${css_prefix}svg`}>
        <g className={`${css_prefix}main-g`}>
          <g className={`${css_prefix}x-g`} />
          <g className={`${css_prefix}y-g`} />
          <path className={`${css_prefix}path`} />
        </g>
      </svg>
    </div>
  );
};

export const BasicAreaChart = BasicAreaChartComponent;
