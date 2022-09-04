import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

// Components.
import { Title } from '../../common/title/Title';

// Constants.
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../../utils/constants/charts';

// data
import { DIAMONDS_DATA as URL } from '../../../utils/constants/data';

// Types.
import { DimensionsType, ScatterPlotType } from '../../../utils/types/charts';

// SCSS.
import './ScatterPlot.scss';

// Components -- charts -- scatter - plot
const css_prefix = 'c--c--s-p__';

// Component props.
interface ScatterPlotProps {
  dimensions: DimensionsType;
  accentColor: { title: string; value: string };
  svgContainer: React.MutableRefObject<HTMLDivElement | null>;
}

const ScatterPlotComponent: React.FunctionComponent<ScatterPlotProps> = ({
  dimensions,
  accentColor,
  svgContainer,
}) => {
  const { right, left, top, bottom } = dimensions;

  // draw
  const draw = useCallback(() => {
    const newWidth = DEFAULT_WIDTH - left - right;
    const newHeight = DEFAULT_HEIGHT - top - bottom;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`)
      .attr('transform', `translare(${left}, ${top})`);

    d3.dsv(',', URL, d => {
      return {
        price: d.price,
        carat: d.carat,
      };
    }).then(data => {
      const maxPrice = Math.max(
        ...data.map(dt => (dt as unknown as ScatterPlotType).price),
        0
      );

      const maxCarat = Math.max(
        ...data.map(dt => (dt as unknown as ScatterPlotType).carat),
        0
      );

      const x = d3.scaleLinear().domain([0, maxPrice]).range([0, newWidth]);

      svg
        .append('g')
        // .select(`.${css_prefix}x-g`)
        .attr('transform', `translate(50, ${newHeight})`)
        .call(d3.axisBottom(x));

      const y = d3.scaleLinear().domain([0, maxCarat]).range([newHeight, 0]);

      svg
        .append('g')
        .attr('transform', `translate(50, 0)`)
        .call(d3.axisLeft(y));

      svg
        .append('g')
        .attr('transform', `translate(50, 0)`)
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', `${css_prefix}circle`)
        .attr('cx', d => {
          return x((d as unknown as ScatterPlotType).price);
        })
        .attr('cy', d => {
          return y((d as unknown as ScatterPlotType).carat);
        })
        .attr('r', 3)
        .style('fill', accentColor.value);

      // setLoading(false);
    });
  }, [accentColor.value, bottom, left, right, top]);

  useLayoutEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className={`${css_prefix}main`} ref={svgContainer}>
      <Title
        title='Diamond Prices'
        subTitle='Carat VS Price in USD (50,000 data points)'
        accentColor={accentColor}
      />

      <svg className={`${css_prefix}svg`}>
        <g className={`${css_prefix}main-g`}></g>
      </svg>
    </div>
  );
};

export const ScatterPlot = ScatterPlotComponent;
