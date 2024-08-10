import "./css/carBets.css";

const CarBets = ({ cars, userBet, setUserBet, unclickCarBet }) => {
    const handleCarBetClick = (e) => {
        let temp = userBet;
        temp.car = e.target.id;
        temp.bet = userBet.bet;
        setUserBet(temp);
        unclickCarBet();
        e.target.style.opacity = "50%";
    };

    return (
        <div className="car-bets">
            {cars &&
                cars.map((car) => (
                    <div key={car.id} className="car-bet">
                        <button
                            id={"bet" + car.id}
                            onClick={(e) => handleCarBetClick(e)}
                        >
                            CAR {car.id}
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default CarBets;
