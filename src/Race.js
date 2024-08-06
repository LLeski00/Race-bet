import { useEffect, useState, useRef } from "react";
import "./css/race.css";
import Bet from "./Bet";
import ControlBar from "./ControlBar";

const Race = () => {
    const firstUpdate = useRef(true);
    const numOfChanges = 0;
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

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } else {
            balanceChangeAnimation();
        }
    }, [balanceChange]);

    const balanceChangeAnimation = () => {
        if (!balanceChange) return;

        setTimeout(() => {
            const animation =
                document.getElementsByClassName("balance-change")[0]
                    .children[0];

            if (Number(balanceChange) > 0) {
                animation.innerHTML = "+" + balanceChange + "$";
                animation.style.color = "green";
            } else if (Number(balanceChange) < 0) {
                animation.innerHTML = balanceChange + "$";
                animation.style.color = "red";
            }

            animation.style.opacity = "100%";
            animation.style.bottom = "10vh";
            setTimeout(() => {
                animation.style.opacity = "0%";
                setTimeout(() => {
                    animation.style.bottom = "0vh";
                }, 1000);
            }, 1000);
        }, 500);
    };

    const checkBet = (winner) => {
        if (userBet.car[3] == winner) {
            setBalanceChange(userBet.bet * numOfCars);
            setUserBalance(userBalance + userBet.bet * numOfCars);
        } else {
            setBalanceChange("-" + userBet.bet);
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
                        setUserBalance={setUserBalance}
                        setUserBet={setUserBet}
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

                <div className="balance-change">
                    <p>aaa</p>
                </div>

                <ControlBar
                    setSpeed={setSpeed}
                    maxLengthOfRace={maxLengthOfRace}
                />
            </div>
        </div>
    );
};

export default Race;
