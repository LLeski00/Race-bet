import { useEffect, useState } from "react";
import "./css/race.css";
import Bet from "./Bet";
import ControlBar from "./ControlBar";
import Cars from "./Cars";
import { useParams } from "react-router-dom";

const Race = () => {
    let { raceInfo } = useParams();
    const [raceSettings, setRaceSettings] = useState();
    let numOfCarsFinished = 0;
    const [cars, setCars] = useState([]);
    const [winner, setWinner] = useState();
    const [userBalance, setUserBalance] = useState(200);
    const [userBet, setUserBet] = useState({ car: "", bet: 0 });
    const [balanceChange, setBalanceChange] = useState("");

    useEffect(() => {
        console.log(raceInfo);
        setRaceUp();
    }, []);

    const setRaceUp = () => {
        let settings = {};
        console.log(raceInfo);
        settings.numOfCars = Number(
            raceInfo.substring(0, raceInfo.indexOf("x"))
        );
        raceInfo = raceInfo.slice(raceInfo.indexOf("x") + 1);
        settings.minLengthOfRace = Number(
            raceInfo.substring(0, raceInfo.indexOf("x"))
        );
        raceInfo = raceInfo.slice(raceInfo.indexOf("x") + 1);
        settings.maxLengthOfRace = Number(
            raceInfo.substring(0, raceInfo.indexOf("x"))
        );
        raceInfo = raceInfo.slice(raceInfo.indexOf("x") + 1);
        settings.numOfChanges = Number(raceInfo);
        settings.lengthOfSection = 85 / (1 + settings.numOfChanges);
        settings.maxTimeOfSection =
            settings.maxLengthOfRace / (1 + settings.numOfChanges);
        settings.minTimeOfSection =
            settings.minLengthOfRace / (1 + settings.numOfChanges);

        console.log(settings);

        const temp = Array(settings.numOfCars)
            .fill()
            .map((_, index) => ({
                id: index + 1,
                time: 0,
            }));
        setCars(temp);
        setRaceSettings(settings);
    };

    const checkBet = (winner) => {
        if (Number(userBet.car[3]) === winner) {
            setBalanceChange(
                userBet.bet * raceSettings.numOfCars - userBet.bet
            );
            setUserBalance(
                userBalance - userBet.bet + userBet.bet * raceSettings.numOfCars
            );
        } else {
            setBalanceChange(userBet.bet * -1);
            setUserBalance(userBalance - userBet.bet);
        }

        setUserBet({ car: "", bet: 0 });
    };

    const checkWinner = () => {
        setTimeout(() => {
            let temp = raceSettings.maxLengthOfRace;
            let winner = 0;
            for (let i = 0; i < raceSettings.numOfCars; i++) {
                if (cars[i].time < temp) {
                    temp = cars[i].time;
                    winner = cars[i].id;
                }
            }

            setWinner(winner);
            checkBet(winner);
        }, raceSettings.maxTimeOfSection * 1000);
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
                    setWinner={setWinner}
                    numOfCarsFinished={numOfCarsFinished}
                    checkWinner={checkWinner}
                    raceSettings={raceSettings}
                />
            </div>
        </div>
    );
};

export default Race;
