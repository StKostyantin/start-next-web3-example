import React, { useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { useActiveWeb3React } from '@modules/common/hooks';
import { connectorsByName } from '@utils/web3';

import styles from './walletsConnect.module.scss';

const WalletsConnect = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { activate, account, connector } = useActiveWeb3React();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const clickMetaMaskBtn = async () => {
    await activate(connectorsByName.Injected);
    handleCloseModal();
  };

  const clickWalletConnectBtn = async () => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }
    await activate(connectorsByName.WalletConnect);
    handleCloseModal();
  };

  return (
    <>
      <Button className={styles.walletsConnectBtn} onClick={showModal}>
        {!account
          ? 'Connect wallet'
          : `${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
      </Button>
      <Modal
        className="Dehive-modal"
        title="Choose wallet"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={false}
        width={680}
      >
        <Row gutter={20} className={styles.walletList}>
          <Col span={12}>
            <div className={styles.walletListItem}>
              <Button onClick={clickMetaMaskBtn}>
                {/* <img src="/img/MM-Icon.svg" alt="metamask" /> */}
                <p>Connect Metamask</p>
              </Button>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.walletListItem}>
              <Button onClick={clickWalletConnectBtn}>
                {/* <img src="/img/walletconnect-logo.svg" alt="walletconnect" /> */}
                <p>WalletConnect</p>
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default WalletsConnect;
