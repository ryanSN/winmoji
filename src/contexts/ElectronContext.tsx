import React, { useCallback } from 'react';
import { CLIPBOARD_WRITE, SET_CLOSE, SET_MINIMIZE } from '../shared';
type ElectronProps = {
  onClipboardWrite?: (char: string | undefined) => void;
  onMinimizeCallback?: () => void;
  onExitCallback?: () => void;
};

type ElectronProviderProps = {
  children?: React.ReactNode;
  onMinimizeCallback?: () => void;
  onExitCallback?: () => void;
};

const ElectronContext = React.createContext<ElectronProps>({});

const ElectronProvider = ({ children }: ElectronProviderProps) => {
  //@ts-ignore
  const { electron } = window;

  const onClipboardWrite = (char: string | undefined) => {
    electron.send(CLIPBOARD_WRITE, char);
  };

  const onMinimizeCallback = () => {
    electron.send(SET_MINIMIZE, {});
  };

  const onExitCallback = useCallback(() => {
    electron.send(SET_CLOSE, {
      closeToTray: true,
    });
  }, [electron]);

  return (
    <ElectronContext.Provider value={{ onClipboardWrite, onExitCallback, onMinimizeCallback }}>
      {children}
    </ElectronContext.Provider>
  );
};

export { ElectronContext, ElectronProvider };
