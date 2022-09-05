import React, { useState } from 'react';
import { Dropdown } from '../../../../components/common/dropdown/Dropdown';
import { AVAILABLE_CHARTS } from '../../../../utils/constants/charts';
import { AVAILABLE_DATASETS } from '../../../../utils/constants/datasets';
import { AccentColorType } from '../../../../utils/types/accent-color';
import { FaArrowRight } from 'react-icons/fa';

// SCSS.
import './Data.scss';

// Pages -- home -- components -- data
const css_prefix = 'p--h--c--d__';

// Component props.
interface DataProps {
  accentColor: AccentColorType;
}

const DataComponent: React.FunctionComponent<DataProps> = ({ accentColor }) => {
  const [option, setOption] = useState<string>('');
  const [chartOptions, setChartOptions] = useState<string>('');

  const onClickSelectChartOptions = (payload: string) => {
    setChartOptions(payload);
  };

  const onClickSelectOption = (payload: string) => {
    setOption(payload);
  };

  return (
    <div className={`${css_prefix}main`}>
      {/* <div></div> */}

      <div className={`${css_prefix}item-main`}>
        <div className={`${css_prefix}item`}>
          <Dropdown
            accentColor={accentColor}
            title='Datasets'
            items={AVAILABLE_DATASETS}
            selectedOption={option}
            onClickSelectOption={onClickSelectOption}
          />
        </div>

        <div className={`${css_prefix}item`}>
          <Dropdown
            accentColor={accentColor}
            title='Charts'
            items={AVAILABLE_CHARTS}
            selectedOption={option}
            onClickSelectOption={onClickSelectOption}
          />
        </div>

        <div className={`${css_prefix}item-button`}>
          Submit
          <div className={`${css_prefix}item-button-icon`}>
            <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Data = DataComponent;
