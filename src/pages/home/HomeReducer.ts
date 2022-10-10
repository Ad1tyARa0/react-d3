import { AccentColorType } from '../../utils/types/accent-color';

// Types.
export const HOME_ON_CLICK_SET_DATA_OPTION = 'HOME_ON_CLICK_SET_DATA_OPTION';
export const HOME_ON_CLICK_SET_CHART_OPTION = 'HOME_ON_CLICK_SET_CHART_OPTION';

// Config.
export const HOME_SET_WIDTH = 'HOME_SET_WIDTH';
export const HOME_SET_HEIGHT = 'HOME_SET_HEIGHT';

// APIs.
export const HOME_SET_LINEAREA_CHART_DATA = 'HOME_SET_LINEAREA_CHART_DATA';
export const HOME_LINEAREA_CHART_DATA_START_LOADING =
  'HOME_LINEAREA_CHART_DATA_START_LOADING';
export const HOME_LINEAREA_CHART_DATA_STOP_LOADING =
  'HOME_LINEAREA_CHART_DATA_STOP_LOADING';

// Actions
export type HomeReducerActionType =
  | {
      type: typeof HOME_ON_CLICK_SET_DATA_OPTION;
      payload: string;
    }
  | {
      type: typeof HOME_ON_CLICK_SET_CHART_OPTION;
      payload: string;
    }
  | {
      type: typeof HOME_SET_LINEAREA_CHART_DATA;
      payload: { date: Date | null; value: number }[];
    }
  | {
      type: typeof HOME_LINEAREA_CHART_DATA_START_LOADING;
    }
  | {
      type: typeof HOME_LINEAREA_CHART_DATA_STOP_LOADING;
    }
  | {
      type: typeof HOME_SET_WIDTH;
      payload: number;
    }
  | {
      type: typeof HOME_SET_HEIGHT;
      payload: number;
    };

// Interface.
export interface HomeReducerStateInterface {
  // Config.
  height: number | undefined;
  width: number | undefined;
  dataOption: string;
  chartOption: string;

  // APIs.
  lineAreaChartData: { date: Date | null; value: number }[];
  lineAreaChartIsLoading: boolean;
}

// Initial state
export const HOME_REDUCER_INITIAL_STATE: HomeReducerStateInterface = {
  // Config.
  width: undefined,
  height: undefined,
  dataOption: 'ba',
  chartOption: 'line',

  // APIs.
  lineAreaChartData: [],
  lineAreaChartIsLoading: false,
};

export const HomeReducer = (
  state: HomeReducerStateInterface,
  action: HomeReducerActionType
): HomeReducerStateInterface => {
  switch (action.type) {
    case HOME_ON_CLICK_SET_DATA_OPTION:
      return {
        ...state,
        dataOption: action.payload,
      };

    case HOME_ON_CLICK_SET_CHART_OPTION:
      return {
        ...state,
        chartOption: action.payload,
      };

    case HOME_SET_LINEAREA_CHART_DATA:
      return {
        ...state,
        lineAreaChartData: action.payload,
        lineAreaChartIsLoading: false,
      };

    case HOME_LINEAREA_CHART_DATA_START_LOADING:
      return {
        ...state,
        lineAreaChartIsLoading: true,
      };

    case HOME_LINEAREA_CHART_DATA_STOP_LOADING:
      return {
        ...state,
        lineAreaChartIsLoading: false,
      };

    case HOME_SET_WIDTH:
      return {
        ...state,
        width: action.payload,
      };

    case HOME_SET_HEIGHT:
      return {
        ...state,
        height: action.payload,
      };

    default:
      return { ...state };
  }
};
