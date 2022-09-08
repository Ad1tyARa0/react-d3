import React, { useState, useRef } from 'react';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

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
  selectedOption: string;
  onClickSelectOption: (payload: string) => void;
}

const DropdownComponent: React.FunctionComponent<DropdownProps> = ({
  items,
  title,
  accentColor,
  selectedOption,
  onClickSelectOption,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const onClickShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickHideDropdown = () => {
    setShowDropdown(false);
  };

  useOnClickOutside(dropdownRef, onClickHideDropdown);

  return (
    <div className={`${css_prefix}main`} ref={dropdownRef}>
      <div
        className={`${css_prefix}title-main`}
        onClick={onClickShowDropdown}
        style={{ borderBottom: `3px solid ${accentColor.value}` }}
      >
        <div className={`${css_prefix}title`}>{title}</div>

        <div
          className={`${css_prefix}title-icon ${
            showDropdown ? css_prefix + 'title-icon-active' : ''
          }`}
        >
          <BsFillCaretRightFill />
        </div>
      </div>

      {showDropdown ? (
        <div
          className={`${css_prefix}item-main`}
          style={{ border: `1px solid ${accentColor.value}` }}
        >
          {items.map(e => {
            return (
              <div
                className={`${css_prefix}item`}
                key={e.id}
                onClick={() => onClickSelectOption(e.value)}
              >
                <div className={`${css_prefix}item-title`}>{e.title}</div>

                <div className={`${css_prefix}item-icon`}>
                  {e.value === selectedOption ? (
                    <RiCheckboxLine />
                  ) : (
                    <RiCheckboxBlankLine />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export const Dropdown = DropdownComponent;
