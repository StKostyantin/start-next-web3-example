import { useEffect } from 'react';
import { Button } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';
import { TransactionReceipt } from '@ethersproject/providers';
import Web3 from 'web3';
import { useContractWeb3 } from '@modules/common/hooks';
import WalletsConnect from '@modules/web3/containers/WalletsConnect';
import { buildQuery } from '@utils/contracts/web3Contract';

import styles from './index.module.scss';

export default function Home() {
  const {
    methods: { count, decrementCounter, incrementCounter },
  } = useContractWeb3.useTestContract();

  const { data: countRes, refetch: counterRefetch } = useQuery('counter', () =>
    buildQuery<BigNumberETH>('call', count),
  );

  const {
    mutate: onIncrement,
    data: resIncrement,
    isLoading: isLoadingIncrement,
  } = useMutation(() => buildQuery<TransactionReceipt>('send', incrementCounter));

  console.log('resIncrement', resIncrement);
  console.log('isLoadingIncrement', isLoadingIncrement);

  const {
    mutate: onDecrement,
    data: resDecrement,
    isLoading: isLoadingDecrement,
  } = useMutation(() => buildQuery<TransactionReceipt>('send', decrementCounter));

  console.log('resDecrement', resDecrement);
  console.log('isLoadingDecrement', isLoadingDecrement);

  useEffect(() => {
    if (resDecrement || onIncrement) {
      counterRefetch();
    }
  }, [resIncrement, resDecrement]);

  const handleIncrement = () => {
    onIncrement();
  };

  const handleDecrement = () => {
    onDecrement();
  };

  return (
    <div className={styles.test}>
      <WalletsConnect />
      <p>counter: {countRes?.toString()}</p>
      <Button disabled={isLoadingIncrement} onClick={handleIncrement} type="primary">
        increment
      </Button>
      <Button type="primary" disabled={isLoadingDecrement} onClick={handleDecrement}>
        decrement
      </Button>
    </div>
  );
}
