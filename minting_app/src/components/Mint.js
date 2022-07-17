
const Mint = (props) => {

    const selectQuantityHandler = () => {
        let tempQuantities = document.getElementById("quantities");
        let tempQuantity = tempQuantities.options[tempQuantities.selectedIndex].value;
        props.setQuantity(tempQuantity);
    };

    const mintHandler = () => {
        props.contract.mintPunks(props.quantity);
    };

    return(
        <div 
            className="
            items-stretch  
            justify-top
            h-full
            w-full
            flex
            flex-col
            items-center
            text-center
            col-span-1
            m-1        
            "
        >
            <h2 className="
                font-medium 
                leading-tight 
                text-4xl 
                text-red-600
                text-gray-300
                text-center
                m-1                
                
                bg-gradient-to-b
                from-yellow-600 via-red-600 to-black
            ">Mint</h2>
            <div>Quantity:</div>
            <select
            id="quantities"  
            onChange={selectQuantityHandler}
            className="
                form-select
                block
                px-3
                py-1.5
                text-base
                text-center
                font-normal
                text-black
                bg-white 
                bg-clip-padding 
                bg-no-repeat
                border 
                border-solid 
                border-black
                rounded-3xl
                transition
                ease-in-out
                m-1
                focus:text-black
                focus:bg-white 
                focus:border-black
                focus:outline-none
                appearance-none"
            >
                <option value="1">1</option> 
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button
                className="
                    inline-block 
                    px-6 
                    py-2 
                    border-2 
                    border-black 
                    text-black
                    font-medium text-xs 
                    leading-tight 
                    uppercase 
                    focus:outline-none 
                    focus:ring-0 
                    transition 
                    duration-150 
                    ease-in-out
                    hover:bg-red-600
                    hover:text-black
                    hover:border-black
                    ring-0
                    rounded-3xl
                    bg-gradient-to-b
                    from-black via-gray-300 to-black
                "
                onClick = { mintHandler }
            >
                    Mint
            </button>
        </div>
    )
};

export default Mint;