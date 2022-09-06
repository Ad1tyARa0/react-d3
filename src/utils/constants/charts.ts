import { DimensionsType } from '../types/charts';
import { DropdownOptionsType } from '../types/dropdown';

export const DEFAULT_HEIGHT = 400;
export const DEFAULT_WIDTH = 800;
export const DEFAULT_DIMENSIONS: DimensionsType = {
  top: 10,
  bottom: 50,
  right: 50,
  left: 50,
};

export const PIECHART_PALETTE = [
  '#27AE60',
  '#F39C12',
  '#3498DB',
  '#E74C3C',
  '#9B59B6',
  '#7F8C8D',
];

export const PIECHART_PALETTE_MAPPING: { [m: string]: string } = {
  '#27AE60': 'Electricity',
  '#F39C12': 'Savings',
  '#3498DB': 'Rent',
  '#E74C3C': 'Groceries',
  '#9B59B6': 'Fuel',
  '#7F8C8D': 'Investments',
};

export const CHART_TITLE_MAPPING: { [m: string]: string[] } = {
  btc: ['Bitcoin USD (BTC-USD) - 2022', 'CCC - CoinMarketCap. Currency in USD'],
  ba: ['The Boeing Company (BA) - 2022', 'NYSE - Currency in USD'],
};

export const AVAILABLE_CHARTS: DropdownOptionsType[] = [
  {
    id: 1,
    title: 'Area Chart',
    value: 'area',
  },

  {
    id: 2,
    title: 'Line Chart',
    value: 'line',
  },

  // {
  //   id: 3,
  //   title: 'Scatter Plot',
  //   value: 'scatter',
  // },

  // {
  //   id: 4,
  //   title: 'Bar Chart',
  //   value: 'bar',
  // },
];
