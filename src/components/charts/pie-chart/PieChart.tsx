import React, { useCallback, useEffect } from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';

// Types.
import { DimensionsType } from '../../../utils/types/charts';

// Data.
import raw_data from '../../../data/pie-chart.json';

// SCSS.
import './PieChart.scss';
import {
  PIECHART_PALETTE,
  PIECHART_PALETTE_MAPPING,
} from '../../../utils/constants/charts';

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
  type PieChartType = {
    name: string;
    value: number;
  };

  const { left, right, top, bottom } = dimensions;

  const draw = useCallback(() => {
    const newWidth = width - left - right;
    const newHeight = 300 - top - bottom;
    const radius = Math.min(width, newHeight) / 2;

    const data: PieChartType[] = raw_data.map(e => {
      return {
        name: e.expense,
        value: e.amount,
      };
    });

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
      .range(PIECHART_PALETTE);
    // .range(d3.schemeCategory10);

    const pie = d3
      .pie<PieChartType>()
      .sort(null)
      .value(record => record.value);

    const path = d3
      .arc<PieArcDatum<PieChartType>>()
      .innerRadius(50)
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
  }, [bottom, left, right, top, width]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}title-main`}>
        <div
          className={`${css_prefix}title ${css_prefix}title-${accentColor.title}`}
        >
          Expenses
        </div>

        <div>Aug 1st 2022 - Sept 1st 2022</div>
      </div>

      <div className={`${css_prefix}value-main`}>
        {PIECHART_PALETTE.map(e => {
          return (
            <div key={e} className={`${css_prefix}item`}>
              <div
                style={{
                  backgroundColor: `${e}`,
                  height: '18px',
                  width: '18px',
                  borderRadius: '3px',
                  marginRight: '5px',
                }}
              />
              <span>{PIECHART_PALETTE_MAPPING[e]}</span>
            </div>
          );
        })}
      </div>

      <svg className={`${css_prefix}svg`}>
        <g className={`${css_prefix}main-g`}></g>
      </svg>
    </div>
  );
};

export const PieChart = PieChartComponent;
