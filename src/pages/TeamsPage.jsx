import TeamCard from "../components/TeamCard";

const Teams = ()=>{
    const data = [
    {
        image: "https://picsum.photos/200/300?random=1",
        teamName: "Chennai Chargers",
        userName: "cricketFan01",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 7800,
        purseLeft: 1.2,
    },
    {
        image: "https://picsum.photos/200/300?random=2",
        teamName: "Mumbai Mavericks",
        userName: "gameMaster02",
        playersBought: 9,
        totalPlayers: 11,
        totalPoints: 8200,
        purseLeft: 0.8,
    },
    {
        image: "https://picsum.photos/200/300?random=3",
        teamName: "Delhi Dominators",
        userName: "playerKing03",
        playersBought: 7,
        totalPlayers: 11,
        totalPoints: 7600,
        purseLeft: 1.5,
    },
    {
        image: "https://picsum.photos/200/300?random=4",
        teamName: "Kolkata Knights",
        userName: "proCricketer04",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 8000,
        purseLeft: 1.0,
    },
    {
        image: "https://picsum.photos/200/300?random=5",
        teamName: "Bangalore Blazers",
        userName: "teamLeader05",
        playersBought: 9,
        totalPlayers: 11,
        totalPoints: 8500,
        purseLeft: 0.6,
    },
    {
        image: "https://picsum.photos/200/300?random=6",
        teamName: "Hyderabad Hawks",
        userName: "topPlayer06",
        playersBought: 7,
        totalPlayers: 11,
        totalPoints: 7700,
        purseLeft: 1.8,
    },
    {
        image: "https://picsum.photos/200/300?random=7",
        teamName: "Rajasthan Royals",
        userName: "champion07",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 7800,
        purseLeft: 1.3,
    },
    {
        image: "https://picsum.photos/200/300?random=8",
        teamName: "Punjab Panthers",
        userName: "cricketLover08",
        playersBought: 9,
        totalPlayers: 11,
        totalPoints: 8100,
        purseLeft: 0.9,
    },
    {
        image: "https://picsum.photos/200/300?random=9",
        teamName: "Lucknow Legends",
        userName: "bigFan09",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 7800,
        purseLeft: 1.4,
    },
    {
        image: "https://picsum.photos/200/300?random=10",
        teamName: "Gujarat Gladiators",
        userName: "gameChanger10",
        playersBought: 9,
        totalPlayers: 11,
        totalPoints: 8200,
        purseLeft: 0.7,
    },
    {
        image: "https://picsum.photos/200/300?random=11",
        teamName: "Sydney Strikers",
        userName: "aussieLover11",
        playersBought: 7,
        totalPlayers: 11,
        totalPoints: 7600,
        purseLeft: 1.6,
    },
    {
        image: "https://picsum.photos/200/300?random=12",
        teamName: "Melbourne Masters",
        userName: "downUnder12",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 8000,
        purseLeft: 1.1,
    },
    {
        image: "https://picsum.photos/200/300?random=13",
        teamName: "Capetown Chargers",
        userName: "africaFan13",
        playersBought: 9,
        totalPlayers: 11,
        totalPoints: 8300,
        purseLeft: 0.5,
    },
    {
        image: "https://picsum.photos/200/300?random=14",
        teamName: "Jo'burg Jaguars",
        userName: "proteasLover14",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 7900,
        purseLeft: 1.2,
    },
    {
        image: "https://picsum.photos/200/300?random=15",
        teamName: "Dhaka Dynamos",
        userName: "bdFanatic15",
        playersBought: 7,
        totalPlayers: 11,
        totalPoints: 7500,
        purseLeft: 1.7,
    },
    {
        image: "https://picsum.photos/200/300?random=16",
        teamName: "Karachi Kings",
        userName: "pakistanZindabad16",
        playersBought: 9,
        totalPlayers: 11,
        totalPoints: 8200,
        purseLeft: 0.8,
    },
    {
        image: "https://picsum.photos/200/300?random=17",
        teamName: "Colombo Challengers",
        userName: "sriFan17",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 7800,
        purseLeft: 1.4,
    },
    {
        image: "https://picsum.photos/200/300?random=18",
        teamName: "Auckland Aces",
        userName: "kiwiFan18",
        playersBought: 7,
        totalPlayers: 11,
        totalPoints: 7700,
        purseLeft: 1.9,
    },
    {
        image: "https://picsum.photos/200/300?random=19",
        teamName: "Wellington Warriors",
        userName: "nzCricket19",
        playersBought: 9,
        totalPlayers: 11,
        totalPoints: 8000,
        purseLeft: 1.0,
    },
    {
        image: "https://picsum.photos/200/300?random=20",
        teamName: "Barbados Blazers",
        userName: "caribbean20",
        playersBought: 8,
        totalPlayers: 11,
        totalPoints: 7900,
        purseLeft: 1.3,
    }
];

    return(
        <div className="w-[100%]">
            <div>Teams</div>

            <div className="flex flex-col gap-5 w-[100%] justify-center items-center">
                {
                    data?.map((item)=>(
                        <TeamCard item={item}></TeamCard>
                    ))
                }
            </div>
        </div>
    )
}

export default Teams;