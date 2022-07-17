import TokenButtons from './TokenButtons.js';

const Owned = (props) => {

    return(
        <div 
            className="
                text-center 
                col-span-2 
                h-full 
                static
                m-1
            " 
            id="our-collection">
            <h2 className="
                font-medium 
                leading-tight 
                text-4xl 
                text-gray-300
                text-center
                m-1
               
                bg-gradient-to-b
                from-yellow-600 via-red-600 to-black
            ">Your Wallet</h2>
            
            { props.loadingStatus }

            <div className="grid grid-cols-2 gap-4">
            { props.tokenUris.map(
                function(uri, key){
                    return (

                        <div key={key} className="m-1">
                            <h5 className="
                                items-stretch 
                                w-full 
                                bg-gray-200
                                text-black 
                                font-bold 
                                py-2 
                                px-4 
                                rounded-t-3xl  
                                text-center
                                appearance-none
                            ">{uri.name.substring(15)}</h5>
                            <img className="
                                inline-flex
                                items-stretch
                                w-full
                            " src={uri.image}></img>
                            <TokenButtons fate={uri.attributes.Fate} tokenId={parseInt(uri.name.substring(16))} contract={props.contract}/>
                        </div>
                    )
                }
            ) }
            </div>

        </div>
    );
};

export default Owned;