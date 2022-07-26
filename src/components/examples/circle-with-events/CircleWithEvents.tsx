import * as React from "react";

// SCSS.
import "./CircleWithEvents.scss";

// Components -- examples -- circle - with - events
const css_prefix = "c--e--c-w-e__";

interface CircleWithEventsProps {}

class CircleWithEventsComponent extends React.PureComponent<CircleWithEventsProps> {
  componentDidMount() {
    // TODO
  }

  onMouseOverHandler(e: React.MouseEvent<SVGCircleElement, MouseEvent>) {
    // TODO
  }

  onMouseOutHandler() {
    // TODO
  }

  render() {
    return (
      <>
        <svg width="500" height="500">
          <g>
            <circle
              className={`${css_prefix}circle`}
              transform="translate(150, 150)"
              r="100"
              onMouseOver={e => {
                e.stopPropagation();
                this.onMouseOverHandler(e);
              }}
              onMouseOut={e => {
                e.stopPropagation();
                this.onMouseOutHandler();
              }}
              onClick={e => {
                e.stopPropagation();
                alert("on click activated!");
              }}
            />
          </g>
        </svg>
      </>
    );
  }
}

export const CircleWithEvents = CircleWithEventsComponent;
