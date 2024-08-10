import { useState } from "react";
import "./css/controlBar.css";

const ControlBar = ({
    cars,
    setCars,
    minTimeOfSection,
    maxTimeOfSection,
    maxLengthOfRace,
    setWinner,
    lengthOfSection,
    numOfChanges,
    numOfCarsFinished,
    numOfCars,
    checkWinner,
}) => {
    const [carsRacing, setCarsRacing] = useState(false);
    const [carsRestarting, setCarsRestarting] = useState(true);

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

    const resetRace = (e) => {
        setCarsRestarting(true);
        setWinner(null);
        let cars = document.getElementsByClassName("car");
        for (let i = 0; i < cars.length; i++) {
            cars[i].children[2].style.left = "0";
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
            cars[i].children[2].time = 0;
            setSpeed(cars[i].children[2], 0);
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
