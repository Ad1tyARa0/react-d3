import React, { useRef, useEffect, useReducer, useCallback } from 'react';
import * as d3 from 'd3';

// Components.
import { Layout } from '../../layout/Layout';
import { Data } from '../../components/common/data/Data';
import { Title } from '../../components/common/title/Title';
import { Loader } from '../../components/common/loader/Loader';
import { AreaChart } from '../../components/charts/area-chart/AreaChart';
import { AccentColor } from '../../components/common/accent-color/AccentColor';

// import { PieChart } from '../../components/charts/pie-chart/PieChart';
// import { BarChart } from '../../components/charts/bar-chart/BarChart';
// import { LineChart } from '../../components/charts/line-chart/LineChart';
// import { ScatterPlot } from '../../components/charts/scatter-plot/ScatterPlot';

// Constants.
import {
  DEFAULT_DIMENSIONS,
  CHART_TITLE_MAPPING,
  LINE_AND_AREA_CHARTS,
} from '../../utils/constants/charts';
import { COLORS } from '../../utils/constants/colors';
import { OPTION_TO_URL_MAPPING } from '../../utils/constants/data';

// Reducer.
import {
  // Reducer.
  HomeReducer,
  HOME_REDUCER_INITIAL_STATE,

  // Types.
  HOME_SET_WIDTH,
  HOME_SET_HEIGHT,
  HOME_SET_LINEAREA_CHART_DATA,
  HOME_ON_CLICK_SET_DATA_OPTION,
  HOME_ON_CLICK_SET_CHART_OPTION,
  HOME_LINEAREA_CHART_DATA_STOP_LOADING,
  HOME_LINEAREA_CHART_DATA_START_LOADING,
} from './HomeReducer';

// Types and interfaces.
import { BasicChartDataType } from '../../utils/types/data';

// SCSS.
import './Home.scss';
import { LineChart } from '../../components/charts/line-chart/LineChart';
import { DATASETS_LINE_AREA_CHARTS } from '../../utils/constants/datasets';
import { RootContext } from '../../context/RootContext';

// Pages -- home
const css_prefix = 'p--h__';

// Component props.
interface HomeProps {}

const HomeComponent: React.FC<HomeProps> = () => {
  const svgContainer = useRef<HTMLDivElement | null>(null);

  const { accentColor } = React.useContext(RootContext);

  const [state, dispatch] = useReducer(HomeReducer, HOME_REDUCER_INITIAL_STATE);

  const onClickSelectDataOption = (payload: string) => {
    dispatch({
      type: HOME_ON_CLICK_SET_DATA_OPTION,
      payload,
    });
  };

  const onClickSelectChartOption = (payload: string) => {
    dispatch({
      type: HOME_ON_CLICK_SET_CHART_OPTION,
      payload,
    });
  };

  /**
   * Get dimensions
   */
  const getDimensions = () => {
    let newWidth = svgContainer.current?.getBoundingClientRect().width;

    let newHeight = svgContainer.current?.getBoundingClientRect().height;

    dispatch({
      type: HOME_SET_WIDTH,
      payload: newWidth!,
    });

    dispatch({
      type: HOME_SET_HEIGHT,
      payload: newHeight!,
    });
  };

  /**
   * Add event listener.
   * - Clean up fn - remove even listener.
   */
  useEffect(() => {
    getDimensions();

    window.addEventListener('resize', getDimensions);

    return () => window.removeEventListener('resize', getDimensions);
  }, []);

  /**
   * Fetch bitcoin price data.
   * - API call.
   * - Use d3 to parse the data into required format.
   * - Start and stop loading.
   * - Save data to state.
   */
  const fetchLineAndAreaChartData = useCallback(async (URL: string) => {
    // Start loading.
    dispatch({
      type: HOME_LINEAREA_CHART_DATA_START_LOADING,
    });

    try {
      // API call.
      let response = await d3.dsv(',', URL, d => {
        const res = d as unknown as BasicChartDataType;
        const date = d3.timeParse('%Y-%m-%d')(res.date);

        return {
          date,
          value: res.value,
        };
      });

      // Save data to state.
      dispatch({
        type: HOME_SET_LINEAREA_CHART_DATA,
        payload: [...response],
      });
    } catch (error) {
      // Stop loading.
      dispatch({
        type: HOME_LINEAREA_CHART_DATA_STOP_LOADING,
      });
    }
  }, []);

  useEffect(() => {
    fetchLineAndAreaChartData(OPTION_TO_URL_MAPPING[state.dataOption]);
  }, [fetchLineAndAreaChartData, state.dataOption]);

  return (
    <div className={`${css_prefix}main`}>
      <Data
        accentColor={accentColor}
        chartOptions={LINE_AND_AREA_CHARTS}
        dataOptions={DATASETS_LINE_AREA_CHARTS}
        dataOption={state.dataOption}
        chartOption={state.chartOption}
        onClickSelectDataOption={onClickSelectDataOption}
        onClickSelectChartOption={onClickSelectChartOption}
      />

      <Title
        title={CHART_TITLE_MAPPING[state.dataOption][0]}
        subTitle={CHART_TITLE_MAPPING[state.dataOption][1]}
        accentColor={accentColor}
      />

      {state.lineAreaChartIsLoading ? (
        <div className={`${css_prefix}loader-main`}>
          <Loader />
        </div>
      ) : (
        <div className={`${css_prefix}graph-main`}>
          {state.chartOption === 'area' ? (
            <AreaChart
              state={state}
              dimensions={DEFAULT_DIMENSIONS}
              svgContainer={svgContainer}
            />
          ) : state.chartOption === 'line' ? (
            <LineChart
              state={state}
              dimensions={DEFAULT_DIMENSIONS}
              svgContainer={svgContainer}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export const Home = HomeComponent;
