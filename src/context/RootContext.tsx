import React, { createContext, useState } from 'react';
import { AccentColorType } from '../utils/types/accent-color';

export interface RootContextInterface {
  accentColor: AccentColorType;
  onClickSetAccentColor: (payload: AccentColorType) => void;
}

const defaultState: RootContextInterface = {
  accentColor: {
    value: '#2ECC71',
    title: 'green',
  },
  onClickSetAccentColor: (payload: AccentColorType) => {},
};

export const RootContext = createContext<RootContextInterface>(defaultState);

const RootProvider = ({
  children,
}: {
  children: React.ReactNode | JSX.Element;
}) => {
  const [accentColor, setAccentColor] = useState<AccentColorType>({
    value: '#2ECC71',
    title: 'green',
  });

  const onClickSetAccentColor = (payload: AccentColorType) => {
    setAccentColor(payload);
  };

  const value: RootContextInterface = {
    accentColor,
    onClickSetAccentColor,
  };

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export default RootProvider;
