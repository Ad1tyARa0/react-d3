import React, { useState, useRef } from 'react';
import { DropdownOptionsType } from '../../../utils/types/dropdown';
import { BsCaretDown } from 'react-icons/bs';

// SCSS.
import './Dropdown.scss';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

// Components -- common -- dropdown
const css_prefix = 'c--c--d__';

// Component props.
interface DropdownProps {
  items: DropdownOptionsType[];
  title: string;
}

const DropdownComponent: React.FunctionComponent<DropdownProps> = ({
  items,
  title,
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
      >
        <div className={`${css_prefix}title`}>{title}</div>

        <div
          className={`${css_prefix}title-icon ${
            showDropdown ? css_prefix + 'title-icon-active' : ''
          }`}
        >
          <BsCaretDown />
        </div>
      </div>

      {showDropdown ? (
        <div className={`${css_prefix}item-main`}>
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
