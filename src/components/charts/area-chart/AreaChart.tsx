import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

// Types and interfaces.
import { DimensionsType } from '../../../utils/types/charts';
import { HomeReducerStateInterface } from '../../../pages/home/HomeReducer';

// SCSS.
import './AreaChart.scss';

// Components -- charts -- area - chart
const css_prefix = 'c--c--a-c__';

// Component props.
interface AreaChartProps {
  state: HomeReducerStateInterface;
  dimensions: DimensionsType;
  svgContainer: React.MutableRefObject<HTMLDivElement | null>;
}

const AreaChartComponent: React.FC<AreaChartProps> = ({
  state,
  dimensions,
  svgContainer,
}) => {
  const { top, bottom, left, right } = dimensions;

  const draw = useCallback(() => {
    const newWidth = state.width! - left - right;

    const newHeight = state.height! - top - bottom;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`)
      .attr('transofrm', `translate(${left}, ${top})`);

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(state.lineAreaChartData, d => {
          return d.date;
        }) as [Date, Date]
      )
      .range([0, newWidth]);

    svg
      .select(`.${css_prefix}x-g`)
      .attr('transform', `translate(50, ${newHeight + 10})`)
      .call(
        d3.axisBottom(x).tickFormat(d => {
          const formatTime = d3.timeFormat('%b');
          return formatTime(d as Date);
        }) as unknown as (
          selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
          ...args: any[]
        ) => void
      );

    const y = d3
      .scaleLinear()
      // @ts-ignore
      .domain([
        0,
        d3.max(state.lineAreaChartData, d => {
          return +d.value!;
        }),
      ] as number[])
      .range([newHeight, 0]);

    svg
      .select(`.${css_prefix}y-g`)
      .attr('transform', `translate(${left}, 10)`)
      .call(
        d3.axisLeft(y) as unknown as (
          selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
          ...args: any[]
        ) => void
      );

    svg
      .select(`.${css_prefix}path`)
      .datum(state.lineAreaChartData)
      .attr('fill', `${state.accentColor.value}`)
      .attr('transform', `translate(51, 9)`)
      .attr('stroke', `${state.accentColor.value}`)
      .attr('stroke-width', 0.3)
      .attr(
        'd',
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
  }, [
    state.width,
    state.height,
    state.lineAreaChartData,
    state.accentColor.value,
    left,
    right,
    top,
    bottom,
  ]);

  useLayoutEffect(() => {
    if (state.lineAreaChartData) {
      draw();
    }
  }, [draw, state.lineAreaChartData]);

  return (
    <div className={`${css_prefix}main`} ref={svgContainer}>
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

export const AreaChart = AreaChartComponent;
