import { Contract } from '@ethersproject/contracts';

import { contracts, getContract } from '@utils/contracts';
import TEST_ABI from '@modules/web3/abi/test.json';

import { useActiveWeb3React } from './useActiveWeb3React';

function useContract(address: string, ABI: any, withSignerIfPossible = true): Contract {
  const { library, account } = useActiveWeb3React();
  return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
}

export const useTestContract = (withSignerIfPossible?: boolean): Contract =>
  useContract(contracts.TEST, TEST_ABI, withSignerIfPossible);

export default useContract;
