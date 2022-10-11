import React, { useState, useEffect, useCallback } from 'react';
import { feature } from 'topojson-client';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { Feature, FeatureCollection, Geometry } from 'geojson';

// Contexts.
import { RootContext } from '../../context/RootContext';

// SCSS.
import './WorldCharts.scss';

// Pages -- world - chart
const css_prefix = 'p--w-c__';

const uuid = require('react-uuid');

const scale: number = 200;
const cx: number = 400;
const cy: number = 150;

// Component props.
interface WorldChartsProps {}

const WorldChartsComponent: React.FunctionComponent<WorldChartsProps> = () => {
  const { accentColor } = React.useContext(RootContext);

  const [geographies, setGeographies] = useState<
    [] | Array<Feature<Geometry | null>>
  >();

  const fetchMapData = useCallback(async () => {
    try {
      let response = await fetch('data/worldmap.json');

      let result = await response.json();

      const mapFeatures: Array<Feature<Geometry | null>> = (
        feature(
          result,
          result.objects.countries
        ) as unknown as FeatureCollection
      ).features;

      setGeographies(mapFeatures);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMapData();
  }, [fetchMapData]);

  const projection = geoEqualEarth()
    .scale(scale)
    .translate([cx, cy])
    .rotate([0, 0]);

  return (
    <div className={`${css_prefix}main`}>
      <svg width={scale * 7} height={scale * 7} viewBox='0 0 800 450'>
        <g>
          {(geographies as [])?.map((d, i) => {
            return (
              <path
                key={`path-${uuid()}`}
                d={geoPath().projection(projection)(d) as string}
                // fill={`rgba(38, 50, 56, ${
                //   (1 / (geographies ? geographies.length : 0)) * i
                // })`}
                fill={accentColor.value}
                stroke='white'
                strokeWidth={0.5}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export const WorldCharts = WorldChartsComponent;
