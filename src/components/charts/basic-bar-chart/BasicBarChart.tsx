import React from "react";
import * as d3 from "d3";

// SCSS.
import "./BasicBarChart.scss";
import { useD3 } from "../../../hooks/useD3";
import { BarChartDataType } from "../../../utils/types/data";

// const css_prefix = "c--c--b-b-c__";

// Component props.
interface BasicBarChartProps {
  data: Array<BarChartDataType>;
}

const height = 500;
const width = 500;

const BasicBarChartComponent: React.FunctionComponent<BasicBarChartProps> = ({
  data,
}) => {
  const ref = useD3(
    svg => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()
        .domain(data.map((d: BarChartDataType) => d.year) as Iterable<string>)
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d: BarChartDataType) => d.sales)] as Number[])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g: any) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              //@ts-ignore
              d3
                //@ts-ignore
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter(v => x(v as any) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g: any) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g: any) => g.select(".domain").remove())
          .call((g: any) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              //@ts-ignore
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      //   var tooltip = d3.select(".tooltip-area").style("opacity", 0);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d: any) => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", (d: any) => y1(d.sales))
        .attr("height", (d: any) => y1(0) - y1(d.sales))
        .append("title")
        .text((d: any) => `Sales were ${d.sales} in ${d.year}`);
    },
    [data.length]
  );

  return (
    <>
      <svg
        ref={ref as React.LegacyRef<SVGSVGElement> | undefined}
        viewBox={`0 0 ${height} ${width}`}
        style={{
          height: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="tooltip-area">
          <text className="tooltip-area__text">aas</text>
        </g>
      </svg>
    </>
  );
};

export const BasicBarChart = BasicBarChartComponent;
