import Web3 from 'web3';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';

import {
  injected,
  network,
  POLLING_INTERVAL,
  walletconnect,
  NETWORK_URL_HTTPS,
  NETWORK_URL_WSS,
} from './connectors';

export const HttpsWeb3Provider = new Web3.providers.HttpProvider(NETWORK_URL_HTTPS);
export const WssWeb3Provider = new Web3.providers.WebsocketProvider(NETWORK_URL_WSS);

export const DEFAULT_WEB3_PROVIDER = HttpsWeb3Provider;

export const HttpsWeb3 = new Web3(process.browser ? Web3.givenProvider : HttpsWeb3Provider);
export const WssWeb3 = new Web3(WssWeb3Provider);

export const DEFAULT_WEB3 = HttpsWeb3;

export const WEB3_ERROR_VALUE = 3.9638773911973445e75;

export const NetworkContextName = 'INFURA';

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

export const getErrorMessage = (error: Error | undefined): string => {
  if (error instanceof NoEthereumProviderError) {
    return (
      'No Ethereum browser extension ' +
      'detected, install MetaMask on desktop or visit' +
      ' from a dApp browser on mobile.'
    );
  }
  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }
  if (error instanceof UserRejectedRequestErrorInjected) {
    return 'Please authorize this website to access your Ethereum account.';
  }
  console.error(error);
  // @ts-ignore
  return error.message;
};

export enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  WalletConnect = 'WalletConnect',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
};
