import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';

// Types.
import { DimensionsType, PieTypeGeneric } from '../../../utils/types/charts';

// SCSS.
import './PieChart.scss';

// Components -- charts -- pie - chart
const css_prefix = 'c--c--p-c__';

// Component props.
interface PieChartProps {
  width: number;
  dimensions: DimensionsType;
  data: PieTypeGeneric[];
}

const PieChartComponent: React.FunctionComponent<PieChartProps> = ({
  width,
  dimensions,
  data,
}) => {
  const { left, right, top, bottom } = dimensions;

  const draw = useCallback(() => {
    const newWidth = width - left - right;
    const newHeight = 500 - top - bottom;
    const radius = Math.min(width, newHeight) / 2;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth)
      .attr('height', newHeight)
      .select(`.${css_prefix}main-g`)
      .attr('transform', `translate(${newWidth / 2}, ${newHeight / 2})`);

    svg.selectAll('*').remove();

    const color = d3
      .scaleOrdinal()
      .domain(
        d3.extent(data, d => {
          return d.name;
        }) as unknown as string
      )
      // .range(PIECHART_PALETTE);
      .range(d3.schemeCategory10);

    const pie = d3
      .pie<PieTypeGeneric>()
      .sort(null)
      .value(record => record.value);

    const path = d3
      .arc<PieArcDatum<PieTypeGeneric>>()
      .innerRadius(40)
      .outerRadius(125);

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

    const arcLabel = d3.arc().innerRadius(100).outerRadius(200);

    const labels = svg
      .selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .style('text-anchor', 'middle')
      .style('alignment-baseline', 'middle')
      .style('font-size', '20px')
      .attr('transform', d => `translate(${arcLabel.centroid(d as any)})`);

    labels
      .append('tspan')
      .attr('y', '-0.6em')
      .attr('x', 0)
      // .style('font-weight', 'bold')
      .text(d => `${d.data.name}`)
      .attr('class', 'text');

    arch.append('path').attr('d', path);

    // .transition().duration(2000);
  }, [bottom, data, left, right, top, width]);

  useLayoutEffect(() => {
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
