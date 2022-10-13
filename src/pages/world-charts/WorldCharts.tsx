import React, { useState, useEffect, useCallback } from 'react';
import { feature } from 'topojson-client';
import { TbCircle } from 'react-icons/tb';
import {
  geoPath,
  geoEqualEarth,
  geoOrthographic,
  geoStereographic,
} from 'd3-geo';
import { Feature, FeatureCollection, Geometry } from 'geojson';

// Components.
import { Dropdown } from '../../components/common/dropdown/Dropdown';

// Contexts.
import { RootContext } from '../../context/RootContext';

// SCSS.
import './WorldCharts.scss';
import { DropdownOptionsType } from '../../utils/types/dropdown';
import { RangeSlider } from '../../components/common/range-slider/RangeSlider';

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

  const [lambdaAngle, setLambdaAngle] = useState<number>(10);

  const [phiAngle, setPhiAngle] = useState<number>(10);

  const onChangeLambdaAngle = (payload: number) => {
    setLambdaAngle(payload);
  };

  const onChangePhiAngle = (payload: number) => {
    setPhiAngle(payload);
  };

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
    .rotate([lambdaAngle, phiAngle]);

  const equalEarthProjection = geoEqualEarth()
    .scale(scale)
    .translate([cx, cy])
    .rotate([lambdaAngle, phiAngle]);

  const StereographicProjection = geoStereographic()
    .scale(scale)
    .translate([cx, cy])
    .rotate([lambdaAngle, phiAngle]);

  const _renderSettings = () => {
    return (
      <div className={`${css_prefix}settings-main`}>
        <Dropdown
          items={WORLD_MAPS_TYPES}
          title='Select Maps'
          accentColor={accentColor}
          selectedOption={selectedMap}
          onClickSelectOption={onChnageSelectedMap}
        />

        <div className={`${css_prefix}container`}>
          <RangeSlider
            min={0}
            max={360}
            value={lambdaAngle}
            onChangeValue={onChangeLambdaAngle}
            icon={<TbCircle />}
          />
        </div>

        <div className={`${css_prefix}container`}>
          <RangeSlider
            min={0}
            max={360}
            value={phiAngle}
            onChangeValue={onChangePhiAngle}
            icon={<TbCircle />}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`${css_prefix}main`}>
      {_renderSettings()}

      <div className={`${css_prefix}svg`}>
        <svg width={scale * 6} height={scale * 6} viewBox='0 0 800 450'>
          <g>
            {(geographies as [])?.map((d, i) => {
              return (
                <>
                  {selectedMap === 'geoOrthographic' ? (
                    <path
                      key={`path-${uuid()}`}
                      d={geoPath().projection(orthoProjection)(d) as string}
                      fill={`rgba(38, 50, 56, ${
                        (1 / (geographies ? geographies.length : 0)) * i
                      })`}
                      stroke={accentColor.value}
                      strokeWidth={0.5}
                      className={`${css_prefix}path`}
                    />
                  ) : selectedMap === 'geoEqualEarth' ? (
                    <path
                      key={`path-${uuid()}`}
                      d={
                        geoPath().projection(equalEarthProjection)(d) as string
                      }
                      fill={`rgba(38, 50, 56, ${
                        (1 / (geographies ? geographies.length : 0)) * i
                      })`}
                      stroke={accentColor.value}
                      strokeWidth={0.5}
                      className={`${css_prefix}path`}
                    />
                  ) : selectedMap === 'geoStereographic' ? (
                    <path
                      key={`path-${uuid()}`}
                      d={
                        geoPath().projection(StereographicProjection)(
                          d
                        ) as string
                      }
                      fill={`rgba(38, 50, 56, ${
                        (1 / (geographies ? geographies.length : 0)) * i
                      })`}
                      stroke={accentColor.value}
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
    </div>
  );
};

export const WorldCharts = WorldChartsComponent;
