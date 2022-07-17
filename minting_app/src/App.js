import React, { useState } from 'react';
import Header from './components/Header.js';
import Mint from './components/Mint.js';
import Owned from './components/Owned.js';

function App() {

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('Connect Wallet');
  const [quantity, setQuantity] = useState(1);
  const [tokenUris, setTokenUris] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [refreshButtonText, setRefreshButtonText] = useState(null);

  return (
    <div 
      className="
        grid
        grid-cols-3 
        font-Sans
        uppercase
      ">
      <Header
        account = { account } 
        setAccount = { setAccount }
        setProvider = { setProvider }
        setSigner = { setSigner }
        contract = { contract }
        setContract = { setContract }
        loadingStatus = { loadingStatus }
        setLoadingStatus = { setLoadingStatus }
        setTokenUris = { setTokenUris }
        refreshButtonText = { refreshButtonText }
        setRefreshButtonText = { setRefreshButtonText }
      />
      <Mint 
            quantity = { quantity }
            setQuantity = { setQuantity } 
            contract = { contract }
      />
      <Owned
            loadingStatus = { loadingStatus }
            tokenUris = { tokenUris }
            contract = { contract }
      />
      
    </div>
  );
}

export default App;
