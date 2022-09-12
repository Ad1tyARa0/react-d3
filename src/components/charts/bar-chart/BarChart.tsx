import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

// Types and interfaces.
import { BarChartType } from '../../../utils/types/data';
import { DimensionsType } from '../../../utils/types/charts';
import { AccentColorType } from '../../../utils/types/accent-color';

// SCSS.
import './BarChart.scss';

// Components -- charts -- bar - chart
const css_prefix = 'c--c--b-c__';

// Component props.
interface BarChartProps {
  dimensions: DimensionsType;

  accentColor: AccentColorType;
  svgContainer: React.MutableRefObject<HTMLDivElement | null>;
  chartData: BarChartType[];
}

const BarChartComponent: React.FC<BarChartProps> = ({
  dimensions,
  accentColor,
  svgContainer,
  chartData,
}) => {
  const { top, bottom, left, right } = dimensions;

  let data = chartData.sort((a, b) => b.value - a.value);

  const draw = useCallback(() => {
    const newWidth = 1200 - left - right;

    const newHeight = 700 - top - bottom;

    const y = d3.scaleBand().range([0, newHeight]).padding(0.2);

    const x = d3.scaleLinear().range([newWidth, 0]);

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('transform', `translate(0, 0)`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`)
      .attr('transform', `translate(${left}, ${top})`);
    // .attr('viewBox', '0 0 1300 500')
    // .attr('preserveAspectRatio', 'xMinYMin meet')
    // .select(`.${css_prefix}main-g`)

    // d3.dsv(',', URL, d => {
    //   return d as unknown as BarChartType;
    // }).then(data => {

    x.domain([
      d3.max(data, d => {
        return 3 + Math.max(...data.map(dt => (dt as BarChartType).value), 0);
      }),
      0,
    ] as Iterable<d3.NumberValue>);

    y.domain(
      data.map(d => {
        return d.language;
      })
    );

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('transform', `translate(16, 30)`)
      .attr('fill', `${accentColor.value}`)
      .attr('class', `${css_prefix}bar`)
      .attr('x', x(0))
      .attr('y', d => y(d.language)!)
      .transition()
      .duration(800)
      .attr('width', d => x(d.value))
      .delay((d, i) => {
        return i * 100;
      })
      .attr('height', y.bandwidth());

    svg
      .select(`.${css_prefix}x-g`)
      .attr('transform', `translate(15, 30)`)
      .call(
        d3.axisTop(x).ticks(20) as unknown as (
          selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
          ...args: any[]
        ) => void
      );

    svg
      .select(`.${css_prefix}y-g`)
      .attr('transform', `translate(15, 30)`)
      .call(
        d3.axisLeft(y) as unknown as (
          selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
          ...args: any[]
        ) => void
      );
    // });
  }, [accentColor.value, bottom, data, left, right, top]);

  useLayoutEffect(() => {
    if (data) {
      draw();
    }
  }, [draw, data]);

  return (
    <div className={`${css_prefix}main`} ref={svgContainer}>
      <svg className={`${css_prefix}svg`}>
        <g className={`${css_prefix}main-g`}>
          <g className={`${css_prefix}x-g`} />
          <g className={`${css_prefix}y-g`} />
        </g>
      </svg>
    </div>
  );
};

export const BarChart = BarChartComponent;
