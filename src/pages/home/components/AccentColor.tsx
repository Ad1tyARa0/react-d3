import React from 'react';
import { MdInvertColors } from 'react-icons/md';

// Components.
import { ColorsType } from '../../../utils/types/colors';

// SCSS.
import './AccentColor.scss';

// pages -- home -- components -- accent - color
const css_prefix = 'p--h--c--a-c__';

// Component props.
interface AccentColorProps {
  colors: Array<ColorsType>;
  onClickSetAccentColor: (payload: { title: string; value: string }) => void;
  title: string;
}

const AccentColorComponent: React.FC<AccentColorProps> = ({
  colors,
  onClickSetAccentColor,
  title,
}) => {
  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}title`}>
        <div className={`${css_prefix}icon`}>
          <MdInvertColors />
        </div>

        <div className={`${css_prefix}heading`}>{title}</div>
      </div>

      <div className={`${css_prefix}inner-main`}>
        {colors.map(e => {
          return (
            <div
              key={e.id}
              onClick={() =>
                onClickSetAccentColor({ value: e.value, title: e.title })
              }
              className={`${css_prefix}item-main ${css_prefix}item-main-${e.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const AccentColor = AccentColorComponent;
