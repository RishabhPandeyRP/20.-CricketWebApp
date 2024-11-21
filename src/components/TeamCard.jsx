const TeamCard = ({item})=>{
    return(
        <div className="flex justify-between px-4 py-6 items-center border-2 border-blue-500 w-[90%] rounded-xl shadow-xl">
            <div className="flex flex-col gap-3">
                <div className="flex justify-center items-center  border-red-500 gap-3">
                    <div>
                        <img src={item.image} alt="" className="w-[65px] h-[65px] rounded-full"/>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-[700] text-[14px]">{item.teamName}</p>
                        <p className="font-[400] text-[12px]">{item.userName}</p>
                    </div>
                </div>

                <div>
                <div className="flex  items-center  border-green-500 gap-2">
                    <p className="font-[300] text-[14px] text-neutral-700">Total points : </p>
                    <p className="font-[700] text-[14px]">{item.totalPoints}</p>
                </div>

                <div className="flex  items-center  border-green-500 gap-2">
                    <p className="font-[300] text-[14px] text-neutral-700">Purse left :</p>
                    <p className="font-[700] text-[14px]">{item.purseLeft}</p>
                </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center w-[33%] border border-black rounded-xl py-3 gap-2">
                <p className="text-center font-[700] text-[14px]">Total Players Bought</p>
                <p className="font-[700] text-[14px]">{item.playersBought}/{item.totalPlayers}</p>
            </div>
        </div>
    )
}

export default TeamCard