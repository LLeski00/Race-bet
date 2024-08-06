import { useState } from "react";
import "./css/controlBar.css";

const ControlBar = ({ maxLengthOfRace, setSpeed }) => {
    const [carsMoving, setCarsMoving] = useState(false);

    const resetRace = (e) => {
        setCarsMoving(true);
        let cars = document.getElementsByClassName("car");
        for (let i = 0; i < cars.length; i++) {
            cars[i].children[0].style.left = "0";
        }

        setTimeout(() => {
            setCarsMoving(false);
        }, maxLengthOfRace * 1000);
    };

    const startRace = (e) => {
        setCarsMoving(true);
        let cars = document.getElementsByClassName("car");
        for (let i = 0; i < cars.length; i++) {
            cars[i].children[0].time = 0;
            setSpeed(cars[i].children[0], 0);
        }

        setTimeout(() => {
            setCarsMoving(false);
        }, maxLengthOfRace * 1000);
    };

    return (
        <div className="ControlBar">
            <div className="control-bar-content">
                <button
                    id="start-race-button"
                    disabled={carsMoving}
                    onClick={(e) => startRace(e)}
                >
                    Start Race
                </button>
                <button
                    id="reset-race-button"
                    onClick={(e) => resetRace(e)}
                    disabled={carsMoving}
                >
                    Reset Race
                </button>
            </div>
        </div>
    );
};

export default ControlBar;
