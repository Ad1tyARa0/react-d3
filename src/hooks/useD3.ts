import React from "react";
import * as d3 from "d3";

export const useD3 = (
  renderChartFn: (svg: any) => any,
  dependencies: Array<number>
) => {
  const ref = React.useRef<React.LegacyRef<SVGSVGElement> | undefined>();

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current as string));

    return () => {};
  }, [dependencies, renderChartFn]);
  return ref;
};
