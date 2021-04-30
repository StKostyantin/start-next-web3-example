import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from '@ethersproject/providers';

import { calculateGasMargin } from '@utils/index';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber/lib/bignumber';

export const buildQuery = async <T>(
  type: 'call' | 'send',
  method: any,
  args: any[] = [],
  options: any = {},
): Promise<T> => {
  try {
    if (type === 'send') {
      const gasPrice = await method(...args).estimateGas(options);
      const tx = method(...args).send({
        gasPrice,
        ...options,
      });
      tx.on('transactionHash', (hash: string) => {
        console.log('transactionHash', hash);
      });
      // const confirmation = await new Promise(function (res, rej) {
      //   tx.on('confirmation', (confirmationNumber, receipt) => {
      //     if (confirmationNumber === 2) {
      //       res({ confirmationNumber, receipt });
      //     }
      //   });
      // });
      return method(...args).send({
        gasPrice,
        ...options,
      });
    }
    return method(...args).call(options);
  } catch (err) {
    console.log('err', err);
    // if (estimateGas) {
    //   throw new Error(err.error.message);
    // }
    throw new Error(err.message);
  }
};
