import { Contract } from '@ethersproject/contracts';

import { contracts } from '@utils/contracts';
import { getContract } from '@utils/contracts/ethersContracts';
import TEST_ABI from '@modules/web3/abi/test.json';

import { useActiveWeb3React } from './useActiveWeb3React';

function useContractEthers(address: string, ABI: any, withSignerIfPossible = true): Contract {
  const { library, account } = useActiveWeb3React();
  return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
}

export const useTestContract = (withSignerIfPossible?: boolean): Contract =>
  useContractEthers(contracts.TEST, TEST_ABI, withSignerIfPossible);

export default useContractEthers;
