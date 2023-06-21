import './App.css';
import '@rainbow-me/rainbowkit/styles.css';

import React, { useState } from 'react';

import Connector from "./components/Connector.js"
import Mint from "./components/Mint.js"
import Collection from "./components/Collection.js"

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  ContractMethodNoResultError,
  createClient,
  WagmiConfig,
} from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

require('dotenv').config();

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const  contractAddress = '0xFa73bF38C8D97c21502c5289AA71ACCc859e8a50';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState(null);
  const [nftCollection, setNftCollection] = useState(null);
  const [connected, setConnected] = useState(false);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <div className="flex justify-between bg-black font-sans min-w-[600px]">
        <div className="mx-auto">
        <div className="text-center font-FIRESTARTER text-5xl p-10">
          <a className = "text-[#801100]">F</a>
          <a className = "text-[#B62203]">l</a>
          <a className = "text-[#D73502]">a</a>
          <a className = "text-[#FC6400]">m</a>
          <a className = "text-[#FF7500]">m</a>
          <a className = "text-[#FAC000]">a</a>
          <a className = "text-[#801100]">b</a>
          <a className = "text-[#B62203]">l</a>
          <a className = "text-[#D73502]">e </a>
          <a className = "text-[#FC6400]">P</a>
          <a className = "text-[#FF7500]">u</a>
          <a className = "text-[#FAC000]">n</a>
          <a className = "text-[#801100]">k</a>
          <a className = "text-[#B62203]">s</a>
        </div>
        </div>
        <div>
          <div className="min-w-[200px] max-w-[350px] bg-[#c52a01]  text-[#d1dff7] text-3xl font-bold py-2 px-4 m-10 hover:bg-[#fc6401] hover:text-[#D73502] rounded-2xl">
            <Connector
              setUserAddress = { setUserAddress }
              setNftCollection = { setNftCollection }
              connected = { connected }
              setConnected = { setConnected }
              userAddress = { userAddress }
            />
          </div>
        </div>
      </div>
      

      <div className = "flex">

        <div className = "
          mx-auto 
          text-3xl 
          p-10 
          rounded-3xl
        ">
          <Collection
            nftCollection = { nftCollection }
            contractAddress = { contractAddress }
          />
        </div>

        <div className="
          min-w-[200px]
          w-full 
          h-[100px] 
          max-w-[350px] 
          bg-[#c52a01] 
          text-[#d1dff7] 
          text-3xl 
          font-bold m-10 
          rounded-2xl
        ">
          <Mint
            quantity = { quantity }
            setQuantity = { setQuantity }
            contractAddress = { contractAddress }
            userAddress = { userAddress }
          />
        </div>
      
      </div>

      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
