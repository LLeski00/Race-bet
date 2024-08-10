import { useEffect, useState } from "react";
import "./css/race.css";
import Bet from "./Bet";
import ControlBar from "./ControlBar";
import Cars from "./Cars";

const Race = () => {
    const numOfChanges = 5;
    const numOfCars = 3;
    const maxLengthOfRace = 4;
    const minLengthOfRace = 3;
    const lengthOfSection = 85 / (1 + numOfChanges);
    const maxTimeOfSection = maxLengthOfRace / (1 + numOfChanges);
    const minTimeOfSection = minLengthOfRace / (1 + numOfChanges);
    let numOfCarsFinished = 0;
    const [cars, setCars] = useState([]);
    const [winner, setWinner] = useState();
    const [userBalance, setUserBalance] = useState(200);
    const [userBet, setUserBet] = useState({ car: "", bet: 0 });
    const [balanceChange, setBalanceChange] = useState("");

    useEffect(() => {
        const temp = Array(numOfCars)
            .fill()
            .map((_, index) => ({
                id: index + 1,
                time: 0,
            }));
        setCars(temp);
    }, []);

    const checkBet = (winner) => {
        if (Number(userBet.car[3]) === winner) {
            setBalanceChange(userBet.bet * numOfCars - userBet.bet);
            setUserBalance(userBalance - userBet.bet + userBet.bet * numOfCars);
        } else {
            setBalanceChange(userBet.bet * -1);
            setUserBalance(userBalance - userBet.bet);
        }

        setUserBet({ car: "", bet: 0 });
    };

    const checkWinner = () => {
        setTimeout(() => {
            let temp = maxLengthOfRace;
            let winner = 0;
            for (let i = 0; i < numOfCars; i++) {
                if (cars[i].time < temp) {
                    temp = cars[i].time;
                    winner = cars[i].id;
                }
            }

            setWinner(winner);
            checkBet(winner);
        }, maxTimeOfSection * 1000);
    };

    return (
        <div className="Race">
            <div className="race-content">
                {cars && (
                    <Bet
                        cars={cars}
                        userBalance={userBalance}
                        userBet={userBet}
                        setUserBet={setUserBet}
                        balanceChange={balanceChange}
                    />
                )}

                {cars && <Cars cars={cars} />}
                {winner && <p>Car number {winner} is first!</p>}

                <ControlBar
                    cars={cars}
                    setCars={setCars}
                    minTimeOfSection={minTimeOfSection}
                    maxTimeOfSection={maxTimeOfSection}
                    maxLengthOfRace={maxLengthOfRace}
                    setWinner={setWinner}
                    lengthOfSection={lengthOfSection}
                    numOfChanges={numOfChanges}
                    numOfCarsFinished={numOfCarsFinished}
                    numOfCars={numOfCars}
                    checkWinner={checkWinner}
                />
            </div>
        </div>
    );
};

export default Race;
