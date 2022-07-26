import React, { useCallback, useLayoutEffect, useState } from "react";
import * as d3 from "d3";

// SCSS.
import "./SimpleChart.scss";

// Components -- examples -- simple - chart
const css_prefix = "c--e--s-c__";

// Component props.
interface SimpleChartProps {}

interface SimpleChartState {}

/**
 * Using Pure component and class based approach.
 * - Better performance.
 */
class SimpleChartComponent extends React.PureComponent<
  SimpleChartProps,
  SimpleChartState
> {
  ref: React.RefObject<HTMLDivElement>;
  data: number[];

  constructor(props: SimpleChartProps) {
    super(props);

    this.state = {
      // TODO
    };

    this.ref = React.createRef();

    this.data = [100, 200, 300, 400, 500];
  }

  /**
   * Draw chart.
   */
  drawChart = () => {
    const size = 500;
    const rectWidth = 95;

    const svg = d3
      .select(this.ref.current)
      .append("svg")
      .attr("width", size)
      .attr("height", size);

    svg
      .selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i * (rectWidth + 5))
      .attr("y", d => size - d)
      .attr("width", rectWidth)
      .attr("height", d => d)
      .attr("fill", "tomato");
  };

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return <div className={`${css_prefix}main`} ref={this.ref} />;
  }
}

/**
 * Using functional components.
 */
const SimpleChartComponent2: React.FunctionComponent<SimpleChartProps> = () => {
  // Create reference.
  const ref: React.RefObject<HTMLDivElement> = React.createRef();

  const [data] = useState([100, 200, 300, 400, 450]);

  /**
   * Draw chart.
   */
  const drawChart = useCallback(() => {
    const size = 500;
    const rectWidth = 95;

    let svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", size)
      .attr("height", size);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: number, i: number) => 5 + i * (rectWidth + 5))
      .attr("y", (d: number) => size - d)
      .attr("width", rectWidth)
      .attr("height", (d: number) => d)
      .attr("fill", "tomato");

    // TODO - react is causing the svg to render twice.
  }, [data, ref]);

  /**
   * If the DOM is being mainpulated it is better to use 'useLayoutEffect'.
   *
   */
  useLayoutEffect(() => {
    drawChart();
  });

  return <div className={`${css_prefix}main`} ref={ref} />;
};

export const SimpleChart = SimpleChartComponent;
export const SimpleChartFunctional = SimpleChartComponent2;
