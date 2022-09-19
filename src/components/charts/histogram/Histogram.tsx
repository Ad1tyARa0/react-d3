import React, { useState, useLayoutEffect, useCallback } from 'react';
import * as d3 from 'd3';

// SCSS.
import './Histogram.scss';

import { AccentColorType } from '../../../utils/types/accent-color';
import { DimensionsType } from '../../../utils/types/charts';
import { BarChartType } from '../../../utils/types/data';
import { BarNodeType, HistogramDataType } from '../../../utils/types/histogram';

// Components -- charts -- histogram
const css_prefix = 'c--c--h__';

// Component props.
interface HistogramProps {
  width: number;
  height: number;
  data: Array<number>;
  accentColor: AccentColorType;
  dimensions: DimensionsType;
}

const HistogramComponent: React.FunctionComponent<HistogramProps> = ({
  width,
  height,
  data,
  accentColor,
  dimensions,
}) => {
  const { top, left, bottom, right } = dimensions;

  const [numberOfTicks, setNumberOfTicks] = useState<number>(10);

  const onChangeNumberOfTicks = (event: React.ChangeEvent<{}>) => {
    console.log(event);
    // const value = newValue as number;

    // setNumberOfTicks(value);
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

    const histogram = d3
      .bin()
      .value(d => {
        return (d as unknown as HistogramDataType).price;
      })
      .domain([0, 750])
      .thresholds(xAxis.ticks(numberOfTicks));

    const bins = histogram(data as Array<number>);

    const yAxisMaxValues = d3.max(bins, d => {
      return d.length;
    }) as unknown as number;

    yAxis.domain([0, yAxisMaxValues]);

    yAxisGroupNode.transition().duration(750).call(d3.axisLeft(yAxis));

    const barNode = histogramChart
      .selectAll<SVGRectElement, number[]>('rect')
      .data(bins);

    barNode
      .enter()
      .append('rect')
      .merge(barNode)
      .transition()
      .duration(750)
      .attr('transform', d => {
        return `translate(${xAxis(d.x0!)}, ${yAxis(d.length)})`;
      })
      .attr('width', d => {
        return xAxis((d as BarNodeType).x1) - xAxis((d as BarNodeType).x0) - 1;
      })
      .attr('height', d => {
        return height - yAxis(d.length);
      })
      .style('fill', accentColor.value);

    barNode.exit().remove();
  }, [data, height, numberOfTicks, width, accentColor.value]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}title`}>
        2020 Eth Price days/price Histogram Chart
      </div>

      <svg height={height + top + bottom} width={width + left + right}>
        <text x={left - 35} y={top - 10} fontSize={10}>
          Days
        </text>

        <text x={width + left + 20} y={height + top + 16} fontSize={10}>
          Price
        </text>

        <g
          className={`${css_prefix}histogram-chart`}
          transform={`translate(${left}, ${top})`}
        ></g>
      </svg>

      <div className={`${css_prefix}slider-div`}>
        <div className={`${css_prefix}ticks`}>Number of Ticks</div>

        <input
          type='range'
          // defaultValue={numberOfTicks}
          min={10}
          max={85}
          value={numberOfTicks}
          onChange={event => onChangeNumberOfTicks(event)}
        />
      </div>
    </div>
  );
};

export const Histogram = HistogramComponent;
