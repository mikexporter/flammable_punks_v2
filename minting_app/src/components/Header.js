import { ethers } from 'ethers';
//import { checkProperties } from 'ethers/lib/utils';
import abi from '../abi/abi.json'

const Header = (props) => {
      
    const connectWalletHandler = async () => {

        const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        
        await tempProvider.send("eth_requestAccounts", []);

        props.setProvider(tempProvider);

        const tempSigner = tempProvider.getSigner();

        props.setSigner(tempSigner);

        let tempContract = new ethers.Contract('0xFa73bF38C8D97c21502c5289AA71ACCc859e8a50',
        abi,
        tempSigner)
        props.setContract(tempContract);

        let tempAccount = await tempSigner.getAddress();
        props.setAccount(tempAccount.substring(0,6)+'...'+tempAccount.substring(38));

        props.setLoadingStatus('loading...')

        let tempTokenUris = [];
        
        for (let m = 0;; m++) {
            try {
                let tokenOwner = await tempContract.ownerOf(m);
                if (tokenOwner === tempAccount) {
                    let tempTokenUri = await tempContract.tokenURI(m);
                    tempTokenUri = await fetch(tempTokenUri);
                    tempTokenUri = await tempTokenUri.json()
                    tempTokenUris.push(tempTokenUri);
                }
            } catch (e) {
              console.log(e);
              break; 
            }
        }
        
        props.setTokenUris(tempTokenUris);

        props.setLoadingStatus(null);

    };

    return(
        <div className="
            col-span-3 
            grid 
            grid-cols-3 
            text-center
            m-1
        ">
        <div className="
            col-span-2
            items-stretch  
            h-full
            w-full
            flex
            flex-col
        ">
            <h1 
                className="
                    font-medium 
                    leading-tight 
                    text-4xl 
                    text-black
                    m-1
                    rounded-t-3xl
                    bg-gradient-to-b
                    from-yellow-600 via-orange-600 to-red-600
                "
            >
                Flammable Punks
            </h1>
        </div>

        <div 
            className='
                flex
                flex-col
                items-center
                col-span-1
                w-full
                h-full
            '
        >
            <button
                onClick={connectWalletHandler}
                className="
                    inline-block 
                    px-6 
                    py-2 
                    border-2 
                    border-black
                    text-black
                    font-medium 
                    text-xs 
                    leading-tight 
                    uppercase 
                    rounded-3xl
                    hover:bg-red-600
                    hover:text-black
                    hover:border-black
                    focus:outline-none 
                    focus:ring-0 
                    transition 
                    duration-150 
                    ease-in-out
                    m-1
                    ring-0
                    w-full
                    h-full
                    bg-gradient-to-b
                    from-black via-gray-300 to-black
                    "
            >
                { props.account }
            </button>
            {props.refreshButtonText}
        </div>
        </div>
    )
};

export default Header;