import React, { useCallback, useEffect, useState } from 'react';
import {
  DimensionsType,
  PieChartType,
  PieTypeGeneric,
} from '../../../utils/types/charts';
import { PieArcDatum } from 'd3-shape';
import data from '../../../data/pie-chart.json';
import { EXPENSES_DATA as URL } from '../../../utils/constants/data';

import * as d3 from 'd3';

// SCSS.
import './PieChart.scss';
import { DEFAULT_HEIGHT } from '../../../utils/constants/charts';

// Components -- charts -- pie - chart
const css_prefix = 'c--c--p-c__';

// Component props.
interface PieChartProps {
  width: number;
  dimensions: DimensionsType;
  accentColor: { title: string; value: string };
}

const PieChartComponent: React.FunctionComponent<PieChartProps> = ({
  width,
  dimensions,
  accentColor,
}) => {
  const { left, right, top, bottom } = dimensions;

  const draw = useCallback(() => {
    const newWidth = 500 - left - right;
    const newHeight = DEFAULT_HEIGHT - top - bottom;
    const radius = Math.min(width, newHeight) / 2;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth)
      .attr('height', newHeight)
      .select(`.${css_prefix}main-g`)
      .attr('transform', `translate(${newWidth} / 2, ${newHeight} / 2)`);

    d3.dsv(',', URL, d => {
      const res = d as unknown as PieChartType;

      return {
        name: res.expense,
        value: res.amount,
      };
    }).then(data => {
      const color = d3
        .scaleOrdinal()
        .domain(
          d3.extent(data as { name: string; value: number }[], d => {
            return d.name;
          }) as unknown as string
        )
        .range(d3.schemeCategory10);

      const pie = d3
        .pie<PieTypeGeneric>()
        .sort(null)
        .value(record => {
          return record.value;
        });

      const path = d3
        .arc<PieArcDatum<any>>()
        .innerRadius(0)
        .outerRadius(radius);

      const pieData = pie(data);

      const arch = svg
        .selectAll('.arc')
        .data(pieData)
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('fill', d => {
          return color(d.data.name) as string;
        });

      arch.append('path').attr('d', path);
    });
  }, [bottom, left, right, top, width]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`}>
      <svg className={`${css_prefix}svg`}>
        <g className={`${css_prefix}main-g`}></g>
      </svg>
    </div>
  );
};

export const PieChart = PieChartComponent;
