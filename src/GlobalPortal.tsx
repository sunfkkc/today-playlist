import { createPortal } from 'react-dom';
import { PropsWithChildren, createContext, useState } from 'react';

const PortalContext = createContext<HTMLDivElement | null>(null);

function PortalProvider({ children }: PropsWithChildren) {
  const [portalContainerRef, setPortalContainerRef] =
    useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        id="portal-container"
        ref={(elem) => {
          if (portalContainerRef !== null || elem === null) {
            return;
          }

          setPortalContainerRef(elem);
        }}
      />
    </PortalContext.Provider>
  );
}
function PortalConsumer({ children }: PropsWithChildren) {
  return (
    <PortalContext.Consumer>
      {(portalContainerRef) => {
        if (portalContainerRef === null) {
          return null;
        }
        return createPortal(children, portalContainerRef);
      }}
    </PortalContext.Consumer>
  );
}

export const GlobalPortal = {
  Provider: PortalProvider,
  Consumer: PortalConsumer,
};
