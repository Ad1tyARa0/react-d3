import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

// Components.
import { Title } from '../../common/title/Title';

// Constants.
import { DEFAULT_HEIGHT } from '../../../utils/constants/charts';

// Data.
import { BOEING_COMPANY_DATA as URL } from '../../../utils/constants/data';

// Types and interfaces.
import { DimensionsType } from '../../../utils/types/charts';
import { BasicChartDataType } from '../../../utils/types/data';
import { AccentColorType } from '../../../utils/types/accent-color';

// SCSS.
import './LineChart.scss';

// Components -- charts -- line - chart
const css_prefix = 'c--c--l-c__';

// Component props.
interface LineChartProps {
  width: number;
  dimensions: DimensionsType;
  accentColor: AccentColorType;
  svgContainer: React.MutableRefObject<HTMLDivElement | null>;
}

const LineChartComponent: React.FC<LineChartProps> = ({
  width,
  dimensions,
  accentColor,
  svgContainer,
}) => {
  const { top, bottom, left, right } = dimensions;

  const draw = useCallback(() => {
    const newWidth = width - left - right;

    const newHeight = DEFAULT_HEIGHT - top - bottom;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`);

    d3.dsv(',', URL, d => {
      const res = d as unknown as BasicChartDataType;

      const date = d3.timeParse('%Y-%m-%d')(res.date);

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
        .range([20, newWidth]);

      svg
        .select(`.${css_prefix}x-g`)
        .attr('transform', `translate(10, ${newHeight})`)
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
          d3.max(data, d => {
            return Math.max(
              ...data.map(dt => (dt as unknown as BasicChartDataType).value),
              0
            );
          }),
        ] as number[])
        .range([newHeight, 10]);

      svg
        .select(`.${css_prefix}y-g`)
        .attr('transform', `translate(30, 0)`)
        .call(
          d3.axisLeft(y) as unknown as (
            selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
            ...args: any[]
          ) => void
        );

      svg
        .select(`.${css_prefix}path`)
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', `${accentColor.value}`)
        .attr('stroke-width', 3)
        .attr('transform', `translate(13, 0)`)
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
    });

    // Clean up function.
    return () => d3.select(`.${css_prefix}svg`).selectAll('*').remove();
  }, [accentColor.value, bottom, left, right, top, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`} ref={svgContainer}>
      <Title
        title='The Boeing Company (BA) - 2022'
        subTitle='NYSE - Currency in USD'
        accentColor={accentColor}
      />

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
