import React, { useState, useLayoutEffect, useCallback } from 'react';
import * as d3 from 'd3';

// SCSS.
import './Histogram.scss';

// Components -- charts -- histogram
const css_prefix = 'c--c--h__';

// Component props.
interface HistogramProps {
  width: number;
  height: number;
}

const HistogramComponent: React.FunctionComponent<HistogramProps> = ({
  width,
  height,
}) => {
  const [numberOfTicks, setNumberOfTicks] = useState<number>(10);

  const onChangeNumberOfTicks = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    const value = newValue as number;

    setNumberOfTicks(value);
  };

  const draw = useCallback(() => {
    const histogramChart = d3.selectAll(`.${css_prefix}main`);

    d3.selectAll(`.${css_prefix}main`).selectAll('g').remove();

    const xAxisGroupNode = histogramChart.append('g');

    const yAxisGroupNode = histogramChart.append('g');

    const xAxis = d3.scaleLinear().domain([75, 650]).range([0, width]);

    xAxisGroupNode
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xAxis));

    const yAxis = d3.scaleLinear().range([height, 0]);
  }, [height, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`}>
      <div>Histogram</div>
    </div>
  );
};

export const Histogram = HistogramComponent;
