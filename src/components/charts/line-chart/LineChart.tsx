import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

// Types and interfaces.
import { DimensionsType } from '../../../utils/types/charts';
import { BasicChartDataType } from '../../../utils/types/data';
import { HomeReducerStateInterface } from '../../../pages/home/HomeReducer';

// SCSS.
import './LineChart.scss';
import { RootContext } from '../../../context/RootContext';

// Components -- charts -- line - chart
const css_prefix = 'c--c--l-c__';

// Component props.
interface LineChartProps {
  state: HomeReducerStateInterface;
  dimensions: DimensionsType;
  svgContainer: React.MutableRefObject<HTMLDivElement | null>;
}

const LineChartComponent: React.FC<LineChartProps> = ({
  state,
  dimensions,
  svgContainer,
}) => {
  const { top, bottom, left, right } = dimensions;

  const { accentColor } = React.useContext(RootContext);

  const draw = useCallback(() => {
    const newWidth = state.width! - left - right;

    const newHeight = state.height! - top - bottom;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`);

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(state.lineAreaChartData, d => {
          return d.date;
        }) as [Date, Date]
      )
      .range([20, newWidth]);

    svg
      .select(`.${css_prefix}x-g`)
      .attr('transform', `translate(30, ${newHeight})`)
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
      .domain([
        0,
        d3.max(state.lineAreaChartData, d => {
          return Math.max(
            ...state.lineAreaChartData.map(
              dt => (dt as unknown as BasicChartDataType).value
            ),
            0
          );
        }),
      ] as number[])
      .range([newHeight, 10]);

    svg
      .select(`.${css_prefix}y-g`)
      .attr('transform', `translate(${left}, 0)`)
      .call(
        d3.axisLeft(y) as unknown as (
          selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
          ...args: any[]
        ) => void
      );

    svg
      .select(`.${css_prefix}path`)
      .datum(state.lineAreaChartData)
      .attr('fill', 'none')
      .attr('stroke', `${accentColor.value}`)
      .attr('stroke-width', 1.5)
      .attr('transform', `translate(31, 0)`)
      .attr(
        'd',
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
            return y((d as unknown as BasicChartDataType).value);
          })
      );
    // });

    // Clean up function.
    return () => d3.select(`.${css_prefix}svg`).selectAll('*').remove();
  }, [
    bottom,
    left,
    right,
    accentColor.value,
    state.height,
    state.lineAreaChartData,
    state.width,
    top,
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

export const LineChart = LineChartComponent;
