import React from 'react';

// SCSS.
import './Loader.scss';

// Components -- common -- loader
const css_prefix = 'c--c--l__';

// Component props.
interface LoaderProps {}

const LoaderComponent: React.FunctionComponent<LoaderProps> = () => {
  return (
    <svg
      className={`${css_prefix}spinner`}
      width='65px'
      height='65px'
      viewBox='0 0 66 66'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        className={`${css_prefix}path`}
        fill='none'
        strokeWidth='6'
        strokeLinecap='round'
        cx='33'
        cy='33'
        r='30'
      />
    </svg>
  );
};

export const Loader = LoaderComponent;
