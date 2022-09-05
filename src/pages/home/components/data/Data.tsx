import React, { useState } from 'react';
import { Dropdown } from '../../../../components/common/dropdown/Dropdown';
import { AVAILABLE_DATASETS } from '../../../../utils/constants/datasets';
import { AccentColorType } from '../../../../utils/types/accent-color';

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

  const onClickSelectOption = (payload: string) => {
    setOption(payload);
  };

  return (
    <div className={`${css_prefix}main`}>
      {/* <div></div> */}

      <Dropdown
        accentColor={accentColor}
        title='Datasets'
        items={AVAILABLE_DATASETS}
        selectedOption={option}
        onClickSelectOption={onClickSelectOption}
      />
    </div>
  );
};

export const Data = DataComponent;
