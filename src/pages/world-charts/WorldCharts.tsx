import React, { useState, useEffect, useCallback } from 'react';
import { feature } from 'topojson-client';
import {
  geoPath,
  geoEqualEarth,
  geoOrthographic,
  geoStereographic,
} from 'd3-geo';
import { Feature, FeatureCollection, Geometry } from 'geojson';

// Contexts.
import { RootContext } from '../../context/RootContext';

// SCSS.
import './WorldCharts.scss';
import { Data } from '../../components/common/data/Data';
import { Dropdown } from '../../components/common/dropdown/Dropdown';
import { DropdownOptionsType } from '../../utils/types/dropdown';

// Pages -- world - chart
const css_prefix = 'p--w-c__';

const uuid = require('react-uuid');

const scale: number = 200;
const cx: number = 400;
const cy: number = 150;

const WORLD_MAPS_TYPES: DropdownOptionsType[] = [
  {
    id: 1,
    title: 'Equal Earth',
    value: 'geoEqualEarth',
  },

  {
    id: 2,
    title: 'Orthographic',
    value: 'geoOrthographic',
  },

  {
    id: 3,
    title: 'Stereographic',
    value: 'geoStereographic',
  },
];

// Component props.
interface WorldChartsProps {}

const WorldChartsComponent: React.FunctionComponent<WorldChartsProps> = () => {
  const { accentColor } = React.useContext(RootContext);

  const [geographies, setGeographies] = useState<
    [] | Array<Feature<Geometry | null>>
  >();

  const [selectedMap, setSelectedMap] = useState<string>(
    WORLD_MAPS_TYPES[0].value
  );

  const onChnageSelectedMap = (payload: string) => {
    setSelectedMap(payload);
  };

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

  const orthoProjection = geoOrthographic()
    .scale(scale)
    .translate([cx, cy])
    .rotate([0, 0]);

  const equalEarthProjection = geoEqualEarth()
    .scale(scale)
    .translate([cx, cy])
    .rotate([0, 0]);

  const StereographicProjection = geoStereographic()
    .scale(scale)
    .translate([cx, cy])
    .rotate([0, 0]);

  return (
    <div className={`${css_prefix}main`}>
      <Dropdown
        items={WORLD_MAPS_TYPES}
        title='Select Maps'
        accentColor={accentColor}
        selectedOption={selectedMap}
        onClickSelectOption={onChnageSelectedMap}
      />

      <svg width={scale * 6} height={scale * 6} viewBox='0 0 800 450'>
        <g>
          {(geographies as [])?.map((d, i) => {
            return (
              <>
                {selectedMap === 'geoOrthographic' ? (
                  <path
                    key={`path-${uuid()}`}
                    d={geoPath().projection(orthoProjection)(d) as string}
                    // fill={`rgba(38, 50, 56, ${
                    //   (1 / (geographies ? geographies.length : 0)) * i
                    // })`}
                    fill={accentColor.value}
                    stroke='white'
                    strokeWidth={0.5}
                    className={`${css_prefix}path`}
                  />
                ) : selectedMap === 'geoEqualEarth' ? (
                  <path
                    key={`path-${uuid()}`}
                    d={geoPath().projection(equalEarthProjection)(d) as string}
                    // fill={`rgba(38, 50, 56, ${
                    //   (1 / (geographies ? geographies.length : 0)) * i
                    // })`}
                    fill={accentColor.value}
                    stroke='white'
                    strokeWidth={0.5}
                    className={`${css_prefix}path`}
                  />
                ) : selectedMap === 'geoStereographic' ? (
                  <path
                    key={`path-${uuid()}`}
                    d={
                      geoPath().projection(StereographicProjection)(d) as string
                    }
                    // fill={`rgba(38, 50, 56, ${
                    //   (1 / (geographies ? geographies.length : 0)) * i
                    // })`}
                    fill={accentColor.value}
                    stroke='white'
                    strokeWidth={0.5}
                    className={`${css_prefix}path`}
                  />
                ) : null}
              </>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export const WorldCharts = WorldChartsComponent;
