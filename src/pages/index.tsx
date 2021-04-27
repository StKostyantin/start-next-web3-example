import { useEffect } from 'react';
import { Button } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';
import { TransactionReceipt } from '@ethersproject/providers';

import { useTestContract } from '@modules/common/hooks';
import WalletsConnect from '@modules/web3/containers/WalletsConnect';
import { buildQuery } from '@utils/contracts';

import styles from './index.module.scss';

export default function Home() {
  const {
    count,
    incrementCounter,
    decrementCounter,
    estimateGas: {
      incrementCounter: incrementCounterEstimate,
      decrementCounter: decrementCounterEstimate,
    },
  } = useTestContract();

  const { data: countRes, refetch: counterRefetch } = useQuery(
    'counter',
    (): Promise<BigNumberETH> => buildQuery(count),
  );

  const { mutate: onIncrement, data: resIncrement, isLoading: isLoadingIncrement } = useMutation(
    (): Promise<TransactionReceipt> => buildQuery(incrementCounter, [], incrementCounterEstimate),
  );

  const { mutate: onDecrement, data: resDecrement, isLoading: isLoadingDecrement } = useMutation(
    (): Promise<TransactionReceipt> => buildQuery(decrementCounter, [], decrementCounterEstimate),
  );

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
