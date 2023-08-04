import React from 'react';
import AppContainer from '../../AppLayout/AppContainer';
import { commonHooks } from '../../../hooks';
import { IRoute } from '../../../interfaces';

const { useCurrentRoute } = commonHooks;

interface IFrameContainerProps {
  iFrameSrc: string;
  filteredRoutes: IRoute[];
  ticketBackIcon?: string;
}

const IFrameContainer: React.FC<IFrameContainerProps> = (props) => {
  const { iFrameSrc } = props;
  const { currentRoute } = useCurrentRoute();

  const iframeNameObj = {
    parentOrigin: window.location.origin,
  };

  return (
    <AppContainer title={currentRoute?.name}>
      <iframe
        name={JSON.stringify(iframeNameObj)}
        src={iFrameSrc}
        title={currentRoute?.name}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </AppContainer>
  );
};

export default IFrameContainer;
