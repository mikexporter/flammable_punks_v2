import React from 'react';

import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import abi from '../abi/abi.json';
import { connected } from 'process';

const Mint = (props) => {

    const quantity = props.quantity;
    const setQuantity = props.setQuantity;
    const userAddress = props.userAddress;
    const  contractAddress = '0xFa73bF38C8D97c21502c5289AA71ACCc859e8a50';

    const incrementQuantity = () => {
        if (quantity < 5){
            setQuantity(quantity + 1);
            console.log(mintPunksConfig);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1){
            setQuantity(quantity - 1);
        }
    };

    const { config: mintPunksConfig } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'mintPunks',
        args: [quantity],
    });

    const { write: mintPunks  } = useContractWrite(mintPunksConfig);

    return(
        <div className='h-full w-full'>
        <button onClick={decrementQuantity} className = "w-1/3 h-1/2 align-bottom rounded-tl-lg hover:bg-[#fc6401] hover:text-[#D73502]">-</button>
        <button disabled className = "w-1/3 h-1/2 align-bottom">{quantity}</button>
        <button onClick={incrementQuantity} className = "w-1/3 h-1/2 align-bottom rounded-tr-lg hover:bg-[#fc6401] hover:text-[#D73502]">+</button>

        <button onClick={() => mintPunks?.()} className="w-full h-1/2 align-top rounded-b-lg hover:bg-[#fc6401] hover:text-[#D73502]">
            mint
        </button>
        </div>
    )
};


export default Mint;