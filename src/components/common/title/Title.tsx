import React from 'react';

// SCSS.
import './Title.scss';

// Components -- common -- title
const css_prefix = 'c--c--t__';

// Component props.
interface TitleProps {
  title: string;
  subTitle: string;
  accentColor: { title: string; value: string };
}

const TitleComponent: React.FunctionComponent<TitleProps> = ({
  title,
  subTitle,
  accentColor,
}) => {
  return (
    <div className={`${css_prefix}main`}>
      <div
        className={`${css_prefix}title ${css_prefix}title-${accentColor.title}`}
      >
        {title}
      </div>
      <div>{subTitle}</div>
    </div>
  );
};

export const Title = TitleComponent;
