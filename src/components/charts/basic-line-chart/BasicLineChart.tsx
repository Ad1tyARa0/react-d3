import React, { useCallback, useLayoutEffect } from "react";
import * as d3 from "d3";
import { BasicLineChartDataType } from "../../../utils/types/data";

// SCSS.
import "./BasicLineChart.scss";

const URL =
  "https://gist.githubusercontent.com/Ad1tyARa0/838f68337cbb9d9a64ecdff114216284/raw/line.csv";

// Components -- charts -- basic - line - chart
const css_prefix = "c--c--b-l-c__";

const OFFSET_Y = 20;

const OFFSET_X = 20;

// Component props.
interface BasicLineChartProps {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  fill: string;
}

const BasicLineChartComponent: React.FunctionComponent<BasicLineChartProps> = ({
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
      .select(`.${css_prefix}main`)
      .append("svg")
      .attr("width", newWidth + left + right)
      .attr("height", newHeight + top + bottom)
      .append("g")
      .attr("transofrm", `translate(${left}, ${top})`)
      .attr("preserveAspectRatio", "xMinYMin");

    d3.dsv(",", URL, d => {
      const res = d as unknown as BasicLineChartDataType;

      const date = d3.timeParse("%Y-%m-%d")(res.date);

      return {
        date,
        value: res.value,
      };
    }).then(data => {
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, d => {
            return d.date;
          }) as [Date, Date]
        )
        .range([OFFSET_X, newWidth]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${newHeight})`)
        .attr("class", `${css_prefix}x-axis`)
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, d => {
            return Math.max(
              ...data.map(
                dt => (dt as unknown as BasicLineChartDataType).value
              ),
              0
            );
          }),
        ] as number[])
        .range([newHeight, 10]);

      svg
        .append("g")
        .attr("transform", `translate(${OFFSET_Y}, 0)`)
        .attr("class", `${css_prefix}y-axis`)
        .call(d3.axisLeft(y));

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", fill)
        .attr("stroke-width", 0.5)
        .attr(
          "d",
          //@ts-ignore
          d3
            .line()
            .x(d => {
              return x(
                (
                  d as unknown as {
                    date: number;
                  }
                ).date
              );
            })
            .y(d => {
              return y((d as unknown as BasicLineChartDataType).value);
            })
        );
    });
  }, [bottom, fill, height, left, right, top, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return <div className={`${css_prefix}main`} />;
};

export const BasicLineChart = BasicLineChartComponent;
