import React, { useState, useRef } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';

// Custom hooks.
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

// Types.
import { AccentColorType } from '../../../utils/types/accent-color';
import { DropdownOptionsType } from '../../../utils/types/dropdown';

// SCSS.
import './Dropdown.scss';

// Components -- common -- dropdown
const css_prefix = 'c--c--d__';

// Component props.
interface DropdownProps {
  items: DropdownOptionsType[];
  title: string;
  accentColor: AccentColorType;
}

const DropdownComponent: React.FunctionComponent<DropdownProps> = ({
  items,
  title,
  accentColor,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const onClickShowDropdown = () => {
    setShowDropdown(true);
  };

  const onClickHideDropdown = () => {
    setShowDropdown(false);
  };

  useOnClickOutside(dropdownRef, onClickHideDropdown);

  return (
    <div className={`${css_prefix}main`}>
      <div
        className={`${css_prefix}title-main`}
        onClick={onClickShowDropdown}
        ref={dropdownRef}
        style={{ backgroundColor: `${accentColor.value}` }}
      >
        <div className={`${css_prefix}title`}>{title}</div>

        <div
          className={`${css_prefix}title-icon ${
            showDropdown ? css_prefix + 'title-icon-active' : ''
          }`}
        >
          <BsFillCaretDownFill />
        </div>
      </div>

      {showDropdown ? (
        <div
          className={`${css_prefix}item-main`}
          style={{ border: `1px solid ${accentColor.value}` }}
        >
          {items.map(e => {
            return (
              <div className={`${css_prefix}item`} key={e.id}>
                {e.title}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export const Dropdown = DropdownComponent;
