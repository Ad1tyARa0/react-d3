import React from 'react';
import { BsArrowDownRightCircle } from 'react-icons/bs';

import { Link } from 'react-router-dom';

import { LINKS } from '../../../utils/constants/links';

// SCSS.
import './Links.scss';

// Common -- links
const css_prefix = 'c--l__';

// Component props.
interface LinksProps {}

const LinksComponent: React.FunctionComponent<LinksProps> = () => {
  return (
    <div className={`${css_prefix}main`}>
      {LINKS.map(e => {
        return (
          <div key={e.id} className={`${css_prefix}item-main`}>
            <div className={`${css_prefix}item-title`}>
              <Link to={e.path}>{e.title}</Link>
            </div>

            <Link to={e.path}>
              <div className={`${css_prefix}item-icon`}>
                <BsArrowDownRightCircle />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export const Links = LinksComponent;
