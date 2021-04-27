import { useEffect } from 'react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';

import { getLibrary, NetworkContextName } from '@utils/web3';
import Web3ReactManager from '@modules/web3/containers/Web3ReactManager';

// Fix issues https://github.com/NoahZinsmeister/web3-react/issues/176
const Web3ProviderNetwork = process.browser && createWeb3ReactRoot(NetworkContextName);

const Web3Wrapper = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    if ('ethereum' in window) {
      (window as any).ethereum.autoRefreshOnNetworkChange = false;
    }
  }, []);
  return process.browser ? (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* @ts-ignore */}
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>{children}</Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  ) : (
    children
  );
};

export default Web3Wrapper;
