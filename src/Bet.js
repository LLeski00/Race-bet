import "./css/bet.css";

const Bet = ({ cars, userBalance, userBet, setUserBalance, setUserBet }) => {
    const handleBetClick = (e) => {
        let temp = userBet;
        temp.car = e.target.id;
        temp.bet += 10;
        setUserBet(temp);
        setUserBalance(userBalance - 10);
    };

    return (
        <div className="Bet">
            <div className="bet-content">
                <div className="user-balance">
                    <p>{userBalance} $</p>
                </div>
                <p>BET ON: </p>
                <div className="bets">
                    {cars &&
                        cars.map((car) => (
                            <div key={car.id} className="car-bet">
                                <button
                                    id={"bet" + car.id}
                                    onClick={(e) => handleBetClick(e)}
                                >
                                    CAR {car.id}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Bet;
