import * as React from "react";
import * as d3 from "d3";

// SCSS.
import "./CircleWithEvents.scss";

// Components -- examples -- circle - with - events
const css_prefix = "c--e--c-w-e__";

interface CircleWithEventsProps {}

class CircleWithEventsComponent extends React.PureComponent<CircleWithEventsProps> {
  componentDidMount() {
    // TODO
    // this.draw();
  }

  onMouseOverHandler(e: React.MouseEvent<SVGCircleElement, MouseEvent>) {
    // TODO
  }

  onMouseOutHandler() {
    // TODO
  }

  draw = () => {
    d3.select("svg")
      .append("g")
      .append("circle")
      .attr("transform", "translare(150, 150)")
      .attr("r", 100)
      .attr("class", `${css_prefix}circle`)
      .on("click", () => {
        alert("onClick");
      })
      .on("mouseover", e => {
        this.onMouseOverHandler(e);
      })
      .on("mouseout", e => {
        this.onMouseOutHandler();
      });
  };

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
