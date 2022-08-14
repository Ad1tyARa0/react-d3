import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

import { BOEING_COMPANY_DATA as URL } from '../../../utils/constants/data';

// SCSS.
import './BasicLineChart.scss';

// Types and interfaces.
import { BasicChartDataType } from '../../../utils/types/data';

// Constants.
const OFFSET_X = 20;

// Components -- charts -- basic - line - chart
const css_prefix = 'c--c--b-l-c__';

// Component props.
interface BasicLineChartProps {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  accentColor: { title: string; value: string };
}

const BasicLineChartComponent: React.FC<BasicLineChartProps> = ({
  width,
  height,
  left,
  right,
  top,
  bottom,
  accentColor,
}) => {
  const draw = useCallback(() => {
    const newWidth = width - left - right;

    const newHeight = height - top - bottom;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`)
      .attr('transofrm', `translate(${left}, ${top})`);

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
        .range([OFFSET_X, newWidth]);

      svg
        .select(`.${css_prefix}x-g`)
        .attr('transform', `translate(30, ${newHeight})`)
        .call(
          d3.axisBottom(x) as unknown as (
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
        .attr('transform', `translate(${left}, 0)`)
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
        .attr('transform', `translate(33, 0)`)
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
  }, [accentColor, bottom, height, left, right, top, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`}>
      <div
        className={`${css_prefix}title ${css_prefix}title-${accentColor.title}`}
      >
        Boeing Stock data ( July 2022 )
      </div>

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

export const BasicLineChart = BasicLineChartComponent;
