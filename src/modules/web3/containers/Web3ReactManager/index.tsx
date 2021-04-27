import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { notification } from 'antd';

import { useInactiveListener, useEagerConnect } from '@modules/common/hooks';

import { network } from '@utils/connectors';
import { getErrorMessage, NetworkContextName } from '@utils/web3';

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const { active, error } = useWeb3React();
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(
    NetworkContextName,
  );

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  useEffect(() => {
    if (error || networkError) {
      notification.error({
        message: 'WEB3 Error',
        className: 'notificationError',
        description: getErrorMessage(error || networkError),
      });
    }
  }, [error, networkError]);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  // if neither context is active, spin
  // if (!active && !networkActive) {
  //   return (
  //     <div className={styles.messageWrapper}>
  //       <Loader />
  //     </div>
  //   );
  // }

  return children;
}
