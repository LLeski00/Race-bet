import { useState } from "react";
import "./css/controlBar.css";

const ControlBar = ({
    maxTimeOfSection,
    maxLengthOfRace,
    setSpeed,
    setWinner,
}) => {
    const [carsRacing, setCarsRacing] = useState(false);
    const [carsRestarting, setCarsRestarting] = useState(true);

    const resetRace = (e) => {
        setCarsRestarting(true);
        setWinner(null);
        let cars = document.getElementsByClassName("car");
        for (let i = 0; i < cars.length; i++) {
            cars[i].children[0].style.left = "0";
        }

        setTimeout(() => {
            setCarsRacing(false);
        }, maxTimeOfSection * 1000);
    };

    const startRace = (e) => {
        setCarsRacing(true);
        setCarsRestarting(true);

        let cars = document.getElementsByClassName("car");
        for (let i = 0; i < cars.length; i++) {
            cars[i].children[0].time = 0;
            setSpeed(cars[i].children[0], 0);
        }

        setTimeout(() => {
            setCarsRestarting(false);
        }, maxLengthOfRace * 1000);
    };

    return (
        <div className="ControlBar">
            <div className="control-bar-content">
                <button
                    disabled={carsRacing}
                    id="start-race-button"
                    onClick={(e) => startRace(e)}
                >
                    Start Race
                </button>
                <button
                    disabled={carsRestarting}
                    id="reset-race-button"
                    onClick={(e) => resetRace(e)}
                >
                    Reset Race
                </button>
            </div>
        </div>
    );
};

export default ControlBar;
