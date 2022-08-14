import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

// Constants.
import { DEFAULT_HEIGHT } from '../../../utils/constants/charts';

// Data.
import { PROGRAMMING_LANGUAGES_DATA as URL } from '../../../utils/constants/data';

// Types and interfaces.
import { BarChartType } from '../../../utils/types/data';
import { DimensionsType } from '../../../utils/types/charts';

// SCSS.
import './BasicBarChart.scss';

// Components -- charts -- basic - bar - chart
const css_prefix = 'c--c--b-b-c__';

// Component props.
interface BasicBarChartProps {
  dimensions: DimensionsType;
  width: number;
  accentColor: { title: string; value: string };
  svgContainer: React.MutableRefObject<HTMLDivElement | null>;
}

const BasicBarChartComponent: React.FC<BasicBarChartProps> = ({
  width,
  dimensions,
  accentColor,
  svgContainer,
}) => {
  const { top, bottom, left, right } = dimensions;

  const draw = useCallback(() => {
    const newWidth = width - left - right;

    const newHeight = DEFAULT_HEIGHT - top - bottom;

    const x = d3.scaleBand().range([0, newWidth]).padding(0.2);

    const y = d3.scaleLinear().range([newHeight, 0]);

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`)
      .attr('transform', `translate(${left}, ${top})`);

    d3.dsv(',', URL, d => {
      return d as unknown as BarChartType;
    }).then(data => {
      x.domain(
        data.map(d => {
          return d.language;
        })
      );

      y.domain([
        0,
        d3.max(data, d => {
          return 3 + Math.max(...data.map(dt => (dt as BarChartType).value), 0);
        }),
      ] as number[]);

      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', `${accentColor.value}`)
        // .attr('fill', 'white')
        .attr('class', 'bar')
        .attr('x', d => {
          return x(d.language) || 0;
        })
        .attr('width', x.bandwidth())
        .attr('y', d => {
          return y(d.value);
        })
        .transition()
        .duration(800)
        .attr('height', d => {
          return newHeight - y(d.value);
        })
        .delay((d, i) => {
          return i * 100;
        });

      svg
        .select(`.${css_prefix}x-g`)
        .attr('transform', `translate(0, ${newHeight + 5})`)
        .call(
          d3.axisBottom(x) as unknown as (
            selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
            ...args: any[]
          ) => void
        );

      svg
        .select(`.${css_prefix}y-g`)
        // .attr("transform", `translate(${left}, 0)`)
        .call(
          d3.axisLeft(y) as unknown as (
            selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
            ...args: any[]
          ) => void
        );
    });
  }, [accentColor.value, bottom, left, right, top, width]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

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

export const BasicBarChart = BasicBarChartComponent;
