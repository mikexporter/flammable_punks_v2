import React, { useEffect } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

require('dotenv').config();

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;

export const Connector = (props) => {

    const setUserAddress = props.setUserAddress;
    const setNftCollection = props.setNftCollection;
    const userAddress = props.userAddress;
    const connected = props.connected;
    const setConnected = props.setConnected;

    useEffect(() => {
      if (connected && userAddress) {
          fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${userAddress}&contractAddresses[]=0xFa73bF38C8D97c21502c5289AA71ACCc859e8a50&withMetadata=true&pageSize=100`, {method: 'GET', headers: {accept: 'application/json'}})
              .then(response => response.json())
              .then(data => setNftCollection(data))
              .catch(error => console.error(error));
      }
   }, [connected, userAddress]);

    return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const walletConnected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
                if (!walletConnected) {
                    setUserAddress(null);
                    setConnected(false);
                    setNftCollection(null);
                    return (
                    <button onClick={openConnectModal} type="button" className="h-full w-full">
                        connect
                    </button>
                    );
                }
                if (chain.unsupported) {
                    setUserAddress(null);
                    setConnected(false);
                    setNftCollection(null);
                    return (
                    <button onClick={openChainModal} type="button" className="h-full w-full">
                      wrong network
                    </button>
                    );
                }

                setUserAddress(account.address);
                setConnected(true);

                return (
                <button onClick={openAccountModal} type="button" className="h-full w-full">
                    {account.displayName.toLowerCase()}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};


export default Connector;