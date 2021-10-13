import React from 'react';
import TitleBar from '../TitleBar/TitleBar';
import { Props } from './Layout.types';

const Layout = ({ children }: Props): React.ReactElement => {
  return (
    <div>
      <TitleBar darkMode={true} />
      {children}
    </div>
  );
};

export default Layout;
