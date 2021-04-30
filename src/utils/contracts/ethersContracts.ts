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
    let tx;
    if (estimateGas) {
      const gusLimit = await estimateGas(...args, options);
      tx = await method(...args, {
        gasLimit: calculateGasMargin(gusLimit as BigNumberETH),
        ...options,
      });
    } else {
      tx = await method(...args, options);
    }
    if (tx?.wait) {
      return tx.wait(1);
    }
    return tx;
  } catch (err) {
    if (estimateGas) {
      throw new Error(err.error.message);
    }
    throw new Error(err.message);
  }
};
