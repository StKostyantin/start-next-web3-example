import BigNumber from 'bignumber.js';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';

export const DEFAULT_DECIMAL: number = 18;

export function getExponentValue(decimals: number): BigNumber {
  return new BigNumber(10).pow(decimals);
}

export function getHumanValue(value: string, decimals: number = DEFAULT_DECIMAL): BigNumber {
  return new BigNumber(value).div(getExponentValue(decimals));
}

export function getNonHumanValue(value: string, decimals: number): BigNumber {
  return new BigNumber(value).times(getExponentValue(decimals));
}

// add 10%
export const calculateGasMargin = (value: BigNumberETH): BigNumberETH =>
  value.mul(BigNumberETH.from(10000).add(BigNumberETH.from(1000))).div(BigNumberETH.from(10000));

export enum ChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
  4: 'rinkeby.',
};

export function getEtherscanLink(
  type: 'transaction' | 'token' | 'address' | 'block',
  chainId?: ChainId,
  data?: string,
): string {
  // @ts-ignore
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId!] || ETHERSCAN_PREFIXES[1]}etherscan.io`;
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}
