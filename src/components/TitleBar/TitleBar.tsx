import React, { useContext } from 'react';
import Json from '../../../package.json';
import { Props } from './TitleBar.types';
import {
  StyledAppName,
  StyledCloseButton,
  StyledLogo,
  StyledMinimizeButton,
  StyledTitleBar,
  StyledWindowActions,
  StyledWrapper,
} from './TitleBarStyles';

import appIcon from '../../assets/icons/16x16.png';
import { ElectronContext } from '../../contexts';

const TitleBar = ({ darkMode }: Props) => {
  const { onMinimizeCallback, onExitCallback } = useContext(ElectronContext);

  const onMin = () => {
    if (onMinimizeCallback) {
      onMinimizeCallback();
    }
  };

  return (
    <StyledTitleBar>
      <StyledWrapper>
        <StyledLogo src={appIcon} />
        <StyledAppName>
          {Json.productName} {Json.version && <span>{Json.version}</span>}
        </StyledAppName>
      </StyledWrapper>
      <StyledWindowActions>
        <StyledMinimizeButton onClick={onMin} />
        <StyledCloseButton onClick={onExitCallback} />
      </StyledWindowActions>
    </StyledTitleBar>
  );
};

export default React.memo(TitleBar);
