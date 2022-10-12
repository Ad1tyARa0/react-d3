import React from 'react';

// SCSS.
import './RangeSlider.scss';

// Components -- common -- range - slider
const css_prefix = 'c--c--r-s__';

// Component props.
interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChangeValue: (payload: number) => void;
  icon?: JSX.Element;
}

const RangeSliderComponent: React.FunctionComponent<RangeSliderProps> = ({
  min,
  max,
  value,
  onChangeValue,
  icon,
}) => {
  return (
    <div className={`${css_prefix}slider-div`}>
      <input
        type='range'
        min={min}
        max={max}
        className={`${css_prefix}slider-input`}
        value={value}
        onChange={({ currentTarget }) =>
          onChangeValue(Number(currentTarget.value))
        }
      />

      <div className={`${css_prefix}slider-title-main`} id='discrete-slider'>
        <div className={`${css_prefix}text`}>{value}</div>

        {icon ? <div className={`${css_prefix}icon`}>{icon}</div> : null}
      </div>
    </div>
  );
};

export const RangeSlider = RangeSliderComponent;
