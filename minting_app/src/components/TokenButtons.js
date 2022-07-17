import { useState } from 'react';

const TokenButtons = (props) => {

    const decideFateHandler = () => {
        let tempFates = document.getElementById("decideFate");
        let tempFate = tempFates.options[tempFates.selectedIndex].value;
        if (tempFate === 'Rescue') {
            props.contract.rescuePunk(props.tokenId)
        } else if (tempFate === 'Murder') {
            props.contract.murderPunk(props.tokenId)
        }
    };

    if (props.fate === 'Unknown') {
        return(
            <div>
                <select
                    id="decideFate"
                    className="
                        items-stretch 
                        w-full 
                        bg-gray-200 
                        text-black 
                        font-bold 
                        py-2 
                        px-4 
                        rounded-b-3xl  
                        text-center
                        appearance-none
                        shrink
                    "
                    defaultValue="Decide Fate"
                    onChange={decideFateHandler}
                >
                    <option disabled value="Decide Fate">Decide Fate</option>
                    <option value="Rescue">Rescue</option> 
                    <option value="Murder">Murder</option>
                </select>
            </div>
        )
    } else if  (props.fate === 'Rescued') {
        return(
            <button className="shrink items-stretch w-full bg-green-600 text-black font-bold py-2 px-4 rounded-b-3xl cursor-not-allowed">
                Rescued
            </button>
        )
    } else if  (props.fate === 'Murdered') {
        return(
            <button className="shrink items-stretch w-full bg-red-600 text-black font-bold py-2 px-4 rounded-b-3xl cursor-not-allowed">
                Murdered
            </button>
        )
    } else {
        return(
            <button className="shrink items-stretch w-full bg-gray-200 text-black font-bold py-2 px-4 rounded-b-3xl cursor-not-allowed">
                {props.fate}
            </button>
        )
    }
};

export default TokenButtons;