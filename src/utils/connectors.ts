import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const POLLING_INTERVAL = 12000;
export const CHAIN_ID: number = 4;
export const NETWORK_URL_HTTPS: string =
  'https://rinkeby.infura.io/v3/937743c9c6404c8cb74c1738ea3a75ef';
export const NETWORK_URL_WSS: string =
  'wss://rinkeby.infura.io/ws/v3/937743c9c6404c8cb74c1738ea3a75ef';

if (typeof NETWORK_URL_HTTPS === 'undefined') {
  throw new Error(`RPC_URL must be a defined environment variable`);
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export const network = new NetworkConnector({
  urls: { [CHAIN_ID]: NETWORK_URL_HTTPS },
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [CHAIN_ID]: NETWORK_URL_HTTPS },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
