import React, { useState, useEffect } from 'react';

import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import abi from '../abi/abi.json';

export const Collection = (props) => {

    const [currentRescueTokenId, setCurrentRescueTokenId] = useState(null);
    const [currentMurderTokenId, setCurrentMurderTokenId] = useState(null);

    const nftCollection = props.nftCollection;
    const contractAddress = '0xFa73bF38C8D97c21502c5289AA71ACCc859e8a50';

    const { config: rescuePunkConfig } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'rescuePunk',
        args: [currentRescueTokenId],
    });

    const { write: rescuePunk  } = useContractWrite(rescuePunkConfig);

    const { config: murderPunkConfig } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'murderPunk',
        args: [currentMurderTokenId],
    });

    const { write: murderPunk } = useContractWrite(murderPunkConfig);

    useEffect(() => {
      rescuePunk?.();
    }, [currentRescueTokenId]); // <-- We pass `count` as a dependency of the effect

    useEffect(() => {
      murderPunk?.();
    }, [currentMurderTokenId]); // <-- We pass `count` as a dependency of the effect

    return (
        <div>
          <div className="flex flex-wrap justify-center">
            {nftCollection?.ownedNfts?.map((nft, index) => {
              const imageUrl = nft?.image?.originalUrl;
              const tokenId = nft?.tokenId;
              const punkStatus = imageUrl.split("%20-%20")[1]
              return (imageUrl ? 
              <div className = "m-10 max-w-[336px] min-w-[200px]">
                <img key={index} src={imageUrl} alt=""/>
                
                {punkStatus === "0.png" ? (
                    <>
                    <button onClick={() => setCurrentRescueTokenId(tokenId)} className = "bg-green-300 hover:bg-green-400 w-1/2">Save</button>
                    <button onClick={() => setCurrentMurderTokenId(tokenId)} className = "bg-red-300 hover:bg-red-400 w-1/2">Burn</button>
                    </>
                ) : punkStatus === "1.png" ? (
                    <>
                    <div className="w-full text-center bg-green-400">Saved</div>
                    </>
                ) : (
                    <div className="w-full text-center bg-red-400">Burned</div>
                )}
              </div>
              : null);
            })}
          </div>
        </div>
      );
      

};


export default Collection;