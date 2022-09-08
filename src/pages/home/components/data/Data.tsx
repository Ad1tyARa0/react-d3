import React, { useState } from 'react';
import { Dropdown } from '../../../../components/common/dropdown/Dropdown';
import { AVAILABLE_CHARTS } from '../../../../utils/constants/charts';
import { AVAILABLE_DATASETS } from '../../../../utils/constants/datasets';
import { AccentColorType } from '../../../../utils/types/accent-color';
import { FaArrowRight } from 'react-icons/fa';

// SCSS.
import './Data.scss';
import { HomeReducerStateInterface } from '../../HomeReducer';

// Pages -- home -- components -- data
const css_prefix = 'p--h--c--d__';

// Component props.
interface DataProps {
  state: HomeReducerStateInterface;
  onClickSelectDataOption: (payload: string) => void;
  onClickSelectChartOption: (payload: string) => void;
}

const DataComponent: React.FunctionComponent<DataProps> = ({
  state,
  onClickSelectDataOption,
  onClickSelectChartOption,
}) => {
  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}item-main`}>
        <div className={`${css_prefix}item`}>
          <Dropdown
            accentColor={state.accentColor}
            title='Datasets'
            items={AVAILABLE_DATASETS}
            selectedOption={state.dataOption}
            onClickSelectOption={onClickSelectDataOption}
          />
        </div>

        <div className={`${css_prefix}item`}>
          <Dropdown
            accentColor={state.accentColor}
            title='Charts'
            items={AVAILABLE_CHARTS}
            selectedOption={state.chartOption}
            onClickSelectOption={onClickSelectChartOption}
          />
        </div>

        {/* <div className={`${css_prefix}item-button`}>
          <div className={`${css_prefix}item-button-text`}>Submit</div>

          <div className={`${css_prefix}item-button-icon`}>
            <FaArrowRight />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export const Data = DataComponent;
