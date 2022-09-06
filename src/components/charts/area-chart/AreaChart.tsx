import React, { useCallback, useLayoutEffect } from 'react';
import * as d3 from 'd3';

// Components.
import { Title } from '../../common/title/Title';

// Constants.
import { DEFAULT_HEIGHT } from '../../../utils/constants/charts';

// Data.
import { BITCOIN_PRICE_DATA as URL } from '../../../utils/constants/data';

// Types and interfaces.
import { DimensionsType } from '../../../utils/types/charts';
import { BasicChartDataType } from '../../../utils/types/data';
import { AccentColorType } from '../../../utils/types/accent-color';

// SCSS.
import './AreaChart.scss';

// Components -- charts -- area - chart
const css_prefix = 'c--c--a-c__';

// Component props.
interface AreaChartProps {
  width: number;
  height: number;
  dimensions: DimensionsType;
  accentColor: AccentColorType;
  svgContainer: React.MutableRefObject<HTMLDivElement | null>;
  data: { date: Date | null; value: number }[];
}

const AreaChartComponent: React.FC<AreaChartProps> = ({
  width,
  height,
  dimensions,
  accentColor,
  svgContainer,
  data,
}) => {
  const { top, bottom, left, right } = dimensions;

  const draw = useCallback(() => {
    const newWidth = width! - left - right;

    const newHeight = height! - top - bottom;

    const svg = d3
      .select(`.${css_prefix}svg`)
      .attr('width', newWidth + left + right)
      .attr('height', newHeight + top + bottom)
      .select(`.${css_prefix}main-g`)
      .attr('transofrm', `translate(${left}, ${top})`);

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, d => {
          return d.date;
        }) as [Date, Date]
      )
      .range([0, newWidth]);

    svg
      .select(`.${css_prefix}x-g`)
      .attr('transform', `translate(51, ${newHeight})`)
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
        d3.max(data, d => {
          return +d.value!;
        }),
      ] as number[])
      .range([newHeight, 0]);

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
      .attr('fill', `${accentColor.value}`)
      .attr('transform', `translate(51, -1)`)
      .attr('stroke', `${accentColor.value}`)
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
  }, [accentColor.value, bottom, data, left, right, top, width]);

  useLayoutEffect(() => {
    if (data) {
      draw();
    }
  }, [draw, data]);

  return (
    <div className={`${css_prefix}main`} ref={svgContainer}>
      <Title
        title='Bitcoin USD (BTC-USD) - 2022'
        subTitle='CCC - CoinMarketCap. Currency in USD'
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

export const AreaChart = AreaChartComponent;

//c---------------------------------------->//

// import React, { useCallback, useLayoutEffect } from 'react';
// import * as d3 from 'd3';

// // Components.
// import { Title } from '../../common/title/Title';

// // Constants.
// import { DEFAULT_HEIGHT } from '../../../utils/constants/charts';

// // Data.
// import { BITCOIN_PRICE_DATA as URL } from '../../../utils/constants/data';

// // Types and interfaces.
// import { DimensionsType } from '../../../utils/types/charts';
// import { BasicChartDataType } from '../../../utils/types/data';
// import { AccentColorType } from '../../../utils/types/accent-color';

// // SCSS.
// import './AreaChart.scss';

// // Components -- charts -- area - chart
// const css_prefix = 'c--c--a-c__';

// // Component props.
// interface AreaChartProps {
//   width: number;
//   dimensions: DimensionsType;
//   accentColor: AccentColorType;
//   svgContainer: React.MutableRefObject<HTMLDivElement | null>;
// }

// const AreaChartComponent: React.FC<AreaChartProps> = ({
//   width,
//   dimensions,
//   accentColor,
//   svgContainer,
// }) => {
//   const { top, bottom, left, right } = dimensions;

//   const draw = useCallback(() => {
//     const newWidth = width! - left - right;

//     const newHeight = DEFAULT_HEIGHT - top - bottom;

//     const svg = d3
//       .select(`.${css_prefix}svg`)
//       .attr('width', newWidth + left + right)
//       .attr('height', newHeight + top + bottom)
//       .select(`.${css_prefix}main-g`)
//       .attr('transofrm', `translate(${left}, ${top})`);

//     d3.dsv(',', URL, d => {
//       const res = d as unknown as BasicChartDataType;
//       const date = d3.timeParse('%Y-%m-%d')(res.date);

//       return {
//         date,
//         value: res.value,
//       };
//     }).then(function results(data) {
//       const x = d3
//         .scaleTime()
//         .domain(
//           d3.extent(data, d => {
//             return d.date;
//           }) as [Date, Date]
//         )
//         .range([0, newWidth]);

//       svg
//         .select(`.${css_prefix}x-g`)
//         .attr('transform', `translate(51, ${newHeight})`)
//         .call(
//           d3.axisBottom(x).tickFormat(d => {
//             const formatTime = d3.timeFormat('%b');
//             return formatTime(d as Date);
//           }) as unknown as (
//             selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
//             ...args: any[]
//           ) => void
//         );

//       const y = d3
//         .scaleLinear()
//         // @ts-ignore
//         .domain([
//           0,
//           d3.max(data, d => {
//             return +d.value;
//           }),
//         ] as number[])
//         .range([newHeight, 0]);

//       svg
//         .select(`.${css_prefix}y-g`)
//         .attr('transform', `translate(${left}, 0)`)
//         .call(
//           d3.axisLeft(y) as unknown as (
//             selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
//             ...args: any[]
//           ) => void
//         );

//       svg
//         .select(`.${css_prefix}path`)
//         .datum(data)
//         .attr('fill', `${accentColor.value}`)
//         .attr('transform', `translate(51, -1)`)
//         .attr('stroke', `${accentColor.value}`)
//         .attr('stroke-width', 0.3)
//         .attr(
//           'd',
//           //@ts-ignore
//           d3
//             .area()
//             .curve(d3.curveLinear)
//             .x(d => {
//               return x((d as unknown as { date: number }).date);
//             })
//             .y0(y(0))
//             .y1(d => {
//               return y((d as unknown as { value: number }).value);
//             })
//         );
//     });
//   }, [accentColor.value, bottom, left, right, top, width]);

//   useLayoutEffect(() => {
//     draw();
//   }, [draw]);

//   return (
//     <div className={`${css_prefix}main`} ref={svgContainer}>
//       <Title
//         title='Bitcoin USD (BTC-USD) - 2022'
//         subTitle='CCC - CoinMarketCap. Currency in USD'
//         accentColor={accentColor}
//       />

//       <svg className={`${css_prefix}svg`}>
//         <g className={`${css_prefix}main-g`}>
//           <g className={`${css_prefix}x-g`} />
//           <g className={`${css_prefix}y-g`} />
//           <path className={`${css_prefix}path`} />
//         </g>
//       </svg>
//     </div>
//   );
// };

// export const AreaChart = AreaChartComponent;
