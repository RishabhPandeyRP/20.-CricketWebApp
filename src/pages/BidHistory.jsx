import BidHistoryCard from "../components/BidHistoryCard";
const BidHistory = ()=>{
    const data = [
        {
            image: "https://picsum.photos/200/300?random=1",
            name: "Virat Kohli",
            base: "India",
            points: 890,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=2",
            name: "Steve Smith",
            base: "Australia",
            points: 850,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=3",
            name: "Kane Williamson",
            base: "New Zealand",
            points: 830,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=4",
            name: "Joe Root",
            base: "England",
            points: 820,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=5",
            name: "Babar Azam",
            base: "Pakistan",
            points: 910,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=6",
            name: "Rohit Sharma",
            base: "India",
            points: 780,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=7",
            name: "David Warner",
            base: "Australia",
            points: 760,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=8",
            name: "Quinton de Kock",
            base: "South Africa",
            points: 740,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=9",
            name: "Jos Buttler",
            base: "England",
            points: 770,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=10",
            name: "Shakib Al Hasan",
            base: "Bangladesh",
            points: 800,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=11",
            name: "Pat Cummins",
            base: "Australia",
            points: 890,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=12",
            name: "Trent Boult",
            base: "New Zealand",
            points: 870,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=13",
            name: "Rashid Khan",
            base: "Afghanistan",
            points: 860,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=14",
            name: "Ben Stokes",
            base: "England",
            points: 790,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=15",
            name: "Andre Russell",
            base: "West Indies",
            points: 720,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=16",
            name: "Marnus Labuschagne",
            base: "Australia",
            points: 810,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=17",
            name: "KL Rahul",
            base: "India",
            points: 730,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=18",
            name: "Shaheen Afridi",
            base: "Pakistan",
            points: 750,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=19",
            name: "Tim Southee",
            base: "New Zealand",
            points: 710,
            status: "Active",
        },
        {
            image: "https://picsum.photos/200/300?random=20",
            name: "Jason Holder",
            base: "West Indies",
            points: 700,
            status: "Active",
        }
    ];
    
    return(
        <div className="flex flex-col justify-center items-center w-[100%] gap-5">
            <div>
                <p className="font-[700] text-[25px]">Bid History</p>
            </div>

            <div>

            </div>

            <div className="flex flex-col items-center justify-center gap-5 w-[100%]">
                {
                    data?.map((item)=>(
                        
                            <BidHistoryCard item={item}></BidHistoryCard>
                        
                    ))
                }

            </div>
        </div>
    )
}

export default BidHistory