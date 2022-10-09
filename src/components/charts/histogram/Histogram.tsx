import React, { useState, useLayoutEffect, useCallback } from 'react';
import * as d3 from 'd3';

// SCSS.
import './Histogram.scss';

import { AccentColorType } from '../../../utils/types/accent-color';
import { DimensionsType } from '../../../utils/types/charts';
import { BarChartType } from '../../../utils/types/data';
import { BarNodeType, HistogramDataType } from '../../../utils/types/histogram';
import { Types } from './types';

// Components -- charts -- histogram
const css_prefix = 'c--c--h__';

// Component props.
interface HistogramProps {
  width: number;
  height: number;
  data: Array<HistogramDataType>;
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

  const onChangeNumberOfTicks = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfTicks(Number(event.target.value));
  };

  const draw = useCallback(() => {
    const histogramChart = d3.selectAll(`.${css_prefix}histogramChart`);

    d3.selectAll(`.${css_prefix}histogramChart`).selectAll('g').remove();

    const xAxisGroupNode = histogramChart.append('g');
    const yAxisGroupNode = histogramChart.append('g');

    // x axis - init & scale
    const xAxis = d3.scaleLinear().domain([75, 650]).range([0, width]);

    // x axis - draw
    xAxisGroupNode
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xAxis));

    // y axis: init & set range
    const yAxis = d3.scaleLinear().range([height, 0]);

    const histogram = d3
      .bin()
      .value(d => {
        return (d as unknown as Types.Data).price;
      })
      .domain([0, 750])
      .thresholds(xAxis.ticks(numberOfTicks));

    const bins = histogram(data as Array<never>);

    const yAxisMaxValues = d3.max(bins, d => {
      return d.length;
    }) as number;
    yAxis.domain([0, yAxisMaxValues]);

    // draw
    yAxisGroupNode.transition().duration(750).call(d3.axisLeft(yAxis));

    // join rect with bins
    const barsNode = histogramChart
      .selectAll<SVGRectElement, number[]>('rect')
      .data(bins);

    // Deal with the bars and as well as new ones on redraw
    barsNode
      .enter()
      .append('rect')
      .merge(barsNode) // get existing elements
      // .transition() // apply changes
      // .duration(750)
      .attr('xAxis', 1)
      .attr('transform', function transform(d) {
        return `translate(${xAxis(
          (d as Types.BarsNode).x0
        )},${yAxis((d as Types.BarsNode).length)})`;
      })
      .attr('width', function widthFunc(d) {
        return (
          xAxis((d as Types.BarsNode).x1) - xAxis((d as Types.BarsNode).x0) - 1
        );
      })
      .attr('height', function heightFunc(d) {
        return height - yAxis(d.length);
      })
      .style('fill', accentColor.value);

    // Lastly, If there are extra bars because of the change, remove them;
    barsNode.exit().remove();
  }, [accentColor.value, data, height, numberOfTicks, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}histogram`}>
      <svg height={height + top + bottom} width={width + left + right}>
        <g
          className={`${css_prefix}histogramChart`}
          transform={`translate(${left},${top})`}
        />
      </svg>

      <div className={`${css_prefix}slider-div`}>
        <div className={`${css_prefix}slider-title`} id='discrete-slider'>
          Number of ticks:
        </div>
        <input
          type='range'
          min={10}
          max={85}
          className={`${css_prefix}slider-input`}
          value={numberOfTicks}
          onChange={event => onChangeNumberOfTicks(event)}
        />
      </div>
    </div>
  );
};

export const Histogram = HistogramComponent;
