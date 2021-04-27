import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract, ContractFunction } from '@ethersproject/contracts';
import { isAddress } from '@ethersproject/address';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';

import { calculateGasMargin } from '@utils/index';

export const getSigner = (library: Web3Provider, account: string): JsonRpcSigner =>
  library.getSigner(account).connectUnchecked();

export const getProviderOrSigner = (
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner => (account ? getSigner(library, account) : library);

export const getContract = (
  address: string,
  ABI: any,
  library: Web3Provider | undefined,
  account?: string,
): Contract => {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, library && (getProviderOrSigner(library, account) as any));
};

export const buildQuery = async <T>(
  method: ContractFunction,
  args: any[] = [],
  estimateGas?: ContractFunction,
  options: any = {},
): Promise<T> => {
  try {
    let res;
    if (estimateGas) {
      const gusLimit = await estimateGas(...args, options);
      res = await method(...args, {
        gasLimit: calculateGasMargin(gusLimit as BigNumberETH),
        ...options,
      });
    } else {
      res = await method(...args, options);
    }
    if (res?.wait) {
      return res.wait();
    }
    return res;
  } catch (err) {
    if (estimateGas) {
      throw new Error(err.error.message);
    }
    throw new Error(err.message);
  }
};

export enum ContractsNames {
  TEST = 'TEST',
}

export const contracts: { [contracts in ContractsNames]: string } = {
  [ContractsNames.TEST]: '0x2B76c45c7341ea991bF2782a5004cDF7Eb120C3d',
};
