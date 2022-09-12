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
  // accentColor: { title: string; value: string };
  // svgContainer: React.MutableRefObject<HTMLDivElement | null>;
  data: ScatterPlotType[];
}

const ScatterPlotComponent: React.FunctionComponent<ScatterPlotProps> = ({
  dimensions,
  // accentColor,
  // svgContainer,
  data,
}) => {
  const { right, left, top, bottom } = dimensions;

  // draw
  const draw = useCallback(() => {
    const newWidth = 1000 - left - right;
    const newHeight = 300 - top - bottom;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('viewBox', '0 0 1000 300')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .select(`.${css_prefix}main-g`)
      .attr('transform', `translate(0, 0)`);

    //  .attr("transform", "translate("10","10") rotate(180) scale(-1, -1)");

    // d3.dsv(',', URL, d => {
    //   return {
    //     price: d.price,
    //     carat: d.carat,
    //   };
    // }).then

    // (data => {

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
      .attr('transform', `translate(50, ${newHeight + 10})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear().domain([0, maxCarat]).range([newHeight, 0]);

    svg.append('g').attr('transform', `translate(50, 10)`).call(d3.axisLeft(y));

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
      .attr('r', 0.5)
      .style('fill', '#F39C12');

    // setLoading(false);
    // });
  }, [bottom, data, left, right, top]);

  useLayoutEffect(() => {
    if (data) {
      draw();
    }
  }, [draw, data]);

  // ref={svgContainer}
  return (
    <div className={`${css_prefix}main`}>
      <svg className={`${css_prefix}svg`} viewBox='0 0 100 100'>
        <g className={`${css_prefix}main-g`}></g>
      </svg>
    </div>
  );
};

export const ScatterPlot = ScatterPlotComponent;
