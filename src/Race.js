import { useEffect, useState } from "react";
import "./css/race.css";
import Bet from "./Bet";
import ControlBar from "./ControlBar";

const Race = () => {
    const numOfChanges = 5;
    const numOfCars = 3;
    const maxLengthOfRace = 5;
    const minLengthOfRace = 3;
    const lengthOfSection = 85 / (1 + numOfChanges);
    const maxTimeOfSection = maxLengthOfRace / (1 + numOfChanges);
    const minTimeOfSection = minLengthOfRace / (1 + numOfChanges);
    let numOfCarsFinished = 0;
    const [cars, setCars] = useState([]);
    const [winner, setWinner] = useState();
    const [userBalance, setUserBalance] = useState(100);
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
        if (userBet.car[3] == winner) {
            setBalanceChange(userBet.bet * numOfCars - userBet.bet);
            setUserBalance(userBalance - userBet.bet + userBet.bet * numOfCars);
        } else {
            setBalanceChange(userBet.bet * -1);
            setUserBalance(userBalance - userBet.bet);
        }
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

    const updateCar = (car) => {
        let temp = [...cars];
        temp[car.id - 1].time = car.time;
        setCars(temp);
    };

    const setSpeed = (car, iteration) => {
        let time =
            Math.random() * (maxTimeOfSection - minTimeOfSection) +
            minTimeOfSection;

        car.time += time;
        car.style.transition = `left ${time}s linear`;
        car.style.left = lengthOfSection * (iteration + 1) + "vw";

        if (iteration < numOfChanges) {
            setTimeout(() => {
                setSpeed(car, iteration + 1);
            }, time * 1000);
        } else {
            numOfCarsFinished++;
            updateCar(car);
            if (numOfCarsFinished === numOfCars) checkWinner();
        }
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

                <div className="cars">
                    {cars &&
                        cars.map((car) => (
                            <div key={car.id} className="car">
                                <img
                                    id={car.id}
                                    src="./images/RacerCar.png"
                                    alt="car"
                                ></img>
                            </div>
                        ))}
                </div>
                {winner && <p>Car number {winner} is first!</p>}

                <ControlBar
                    setSpeed={setSpeed}
                    maxTimeOfSection={maxTimeOfSection}
                    maxLengthOfRace={maxLengthOfRace}
                    setWinner={setWinner}
                />
            </div>
        </div>
    );
};

export default Race;
