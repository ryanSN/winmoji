import React from 'react';
import Json from '../../../package.json';
import { Props } from './TitleBar.types';

const TitleBar = ({ darkMode }: Props) => {
  return (
    <div>
      {Json.productName} {Json.version && <span>{Json.version}</span>}
      Darkmode: {darkMode}
    </div>
  );
};

export default React.memo(TitleBar);
