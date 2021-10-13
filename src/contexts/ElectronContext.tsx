import React from 'react';
import { CLIPBOARD_WRITE } from '../shared';
type ElectronProps = {
  onClipboardWrite?: (char: string | undefined) => void;
  sendPing?: () => void;
};

type ElectronProviderProps = {
  children?: React.ReactNode;
};

const ElectronContext = React.createContext<ElectronProps>({});

const ElectronProvider = ({ children }: ElectronProviderProps) => {
  //@ts-ignore
  const { electron } = window;

  const onClipboardWrite = (char: string | undefined) => {
    electron.send(CLIPBOARD_WRITE, char);
  };

  return (
    <ElectronContext.Provider value={{ onClipboardWrite }}>{children}</ElectronContext.Provider>
  );
};

export { ElectronContext, ElectronProvider };
