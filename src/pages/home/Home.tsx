import React, {
  useRef,
  Fragment,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import * as d3 from 'd3';

// Components.
import { Layout } from '../../layout/Layout';
import { Data } from './components/data/Data';
import { Title } from '../../components/common/title/Title';
import { Loader } from '../../components/common/loader/Loader';
import { AccentColor } from './components/accent-color/AccentColor';
// import { PieChart } from '../../components/charts/pie-chart/PieChart';
// import { BarChart } from '../../components/charts/bar-chart/BarChart';
// import { LineChart } from '../../components/charts/line-chart/LineChart';
import { AreaChart } from '../../components/charts/area-chart/AreaChart';
// import { ScatterPlot } from '../../components/charts/scatter-plot/ScatterPlot';

// Constants.
import { COLORS } from '../../utils/constants/colors';
import {
  CHART_TITLE_MAPPING,
  DEFAULT_DIMENSIONS,
} from '../../utils/constants/charts';
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
  HOME_SET_ACCENT_COLOR,
  HOME_LINEAREA_CHART_DATA_STOP_LOADING,
  HOME_LINEAREA_CHART_DATA_START_LOADING,
  HOME_ON_CLICK_SET_DATA_OPTION,
  HOME_ON_CLICK_SET_CHART_OPTION,
} from './HomeReducer';

// Types and interfaces.
import { BasicChartDataType } from '../../utils/types/data';
import { AccentColorType } from '../../utils/types/accent-color';

// SCSS.
import './Home.scss';

// Pages -- home
const css_prefix = 'p--h__';

// Component props.
interface HomeProps {}

const HomeComponent: React.FC<HomeProps> = () => {
  const svgContainer = useRef<HTMLDivElement | null>(null);

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
   * Set accent color.
   * @param payload - accent color.
   */
  const onClickSetAccentColor = (payload: AccentColorType) => {
    dispatch({
      type: HOME_SET_ACCENT_COLOR,
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
      <Layout
        accentColor={
          <AccentColor
            colors={COLORS}
            onClickSetAccentColor={onClickSetAccentColor}
            title='Set accent color'
          />
        }
      >
        <>
          <Data
            state={state}
            onClickSelectDataOption={onClickSelectDataOption}
            onClickSelectChartOption={onClickSelectChartOption}
          />

          <Title
            title={CHART_TITLE_MAPPING[state.dataOption][0]}
            subTitle={CHART_TITLE_MAPPING[state.dataOption][1]}
            accentColor={state.accentColor}
          />

          <div className={`${css_prefix}graph-item`}>
            {state.lineAreaChartIsLoading ? (
              <Loader />
            ) : (
              <AreaChart
                state={state}
                dimensions={DEFAULT_DIMENSIONS}
                svgContainer={svgContainer}
              />
            )}
          </div>
        </>

        {/* <div className={`${css_prefix}graph-item`}>
            <ScatterPlot
              svgContainer={svgContainer}
              dimensions={dimensions}
              accentColor={accentColor}
            />
          </div> */}

        {/* <PieChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
          />

          <LineChart
            svgContainer={svgContainer}
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
          /> */}

        {/* <BarChart
            dimensions={dimensions}
            width={width!}
            accentColor={accentColor}
            svgContainer={svgContainer}
          /> */}
        {/* </div> */}
      </Layout>
    </div>
  );
};

export const Home = HomeComponent;
