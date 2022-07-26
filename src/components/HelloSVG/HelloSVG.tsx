import React, { FC } from "react";

// SCSS.
import "./HelloSVG.scss";

// Components -- hello - svg
const css_prefix = "c--h-svg__";

interface HelloSVGProps {}

export const HelloSVG: FC<HelloSVGProps> = () => {
  const useTag = '<use xlink:href="#heart" />';

  return (
    <div>
      <div className={`${css_prefix}main`}>
        <svg width="500" height="500">
          <g transform="translate(0, 0)">
            <rect
              className={`${css_prefix}rect`}
              width="300"
              height="300" /* fill="tomato" */
            />
          </g>
          <g
            fill="grey"
            transform="rotate(-10 50 100)
                       translate(-36 45.5)
                       skewX(40)
                       scale(1 0.5)"
          >
            <path
              id="heart"
              d="M 10,30 A 20,20 0,0,1
                 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60
                 10,30 z"
            />
          </g>
          <svg
            dangerouslySetInnerHTML={{ __html: useTag }}
            fill="none"
            stroke="white"
          />
        </svg>
      </div>
    </div>
  );
};
