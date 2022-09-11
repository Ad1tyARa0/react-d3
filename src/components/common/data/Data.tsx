import React from 'react';
import { Dropdown } from '../dropdown/Dropdown';

// Types.
import { DropdownOptionsType } from '../../../utils/types/dropdown';
import { AccentColorType } from '../../../utils/types/accent-color';

// SCSS.
import './Data.scss';

// Pages -- home -- components -- data
const css_prefix = 'p--h--c--d__';

// Component props.
interface DataProps {
  accentColor: AccentColorType;
  dataOption: string;
  chartOption: string;
  dataOptions: DropdownOptionsType[];
  chartOptions: DropdownOptionsType[];
  onClickSelectDataOption: (payload: string) => void;
  onClickSelectChartOption: (payload: string) => void;
}

const DataComponent: React.FunctionComponent<DataProps> = ({
  accentColor,
  dataOption,
  chartOption,
  onClickSelectDataOption,
  onClickSelectChartOption,
  dataOptions,

  chartOptions,
}) => {
  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}item-main`}>
        <div className={`${css_prefix}item`}>
          <Dropdown
            accentColor={accentColor}
            title='Datasets'
            items={dataOptions}
            selectedOption={dataOption}
            onClickSelectOption={onClickSelectDataOption}
          />
        </div>

        <div className={`${css_prefix}item`}>
          <Dropdown
            accentColor={accentColor}
            title='Charts'
            items={chartOptions}
            selectedOption={chartOption}
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
