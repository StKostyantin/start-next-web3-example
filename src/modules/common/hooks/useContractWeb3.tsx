import { Contract } from 'web3-eth-contract';
import { Eth } from 'web3-eth';
import { Web3Provider } from '@ethersproject/providers';

import { contracts } from '@utils/contracts';
import TEST_ABI from '@modules/web3/abi/test.json';
import { DEFAULT_WEB3 } from '@utils/web3';

import { useActiveWeb3React } from './useActiveWeb3React';

type EthContract = Contract & Eth;

function useContractEthers(address: string, ABI: any): Contract {
  const { account } = useActiveWeb3React();
  return new DEFAULT_WEB3.eth.Contract(
    ABI,
    address,
    account ? { from: account as string } : {},
  ) as EthContract;
}

export const useTestContract = (): Contract => useContractEthers(contracts.TEST, TEST_ABI);

export default useContractEthers;
