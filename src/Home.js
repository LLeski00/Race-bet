import { useEffect, useState } from "react";
import "./css/home.css";

const Home = () => {
    const numOfChanges = 5;
    let numOfCarsFinished = 0;
    const numOfCars = 3;
    const lengthOfSection = 75 / (1 + numOfChanges);
    const maxTime = 5 / (1 + numOfChanges);
    const minTime = 3 / (1 + numOfChanges);
    const [carTime, setCarTime] = useState(Array(numOfCars).fill(0));

    const checkWinner = () => {};

    const setSpeed = (car, iteration) => {
        let time = Math.random() * (maxTime - minTime) + minTime;
        if (iteration === 0) car.time = time;
        car.time += time;
        car.style.transition = `left ${time}s linear`;
        car.style.left = lengthOfSection * (iteration + 1) + "vw";
        console.log(car.style.left);

        if (iteration < numOfChanges) {
            setTimeout(() => {
                setSpeed(car, iteration + 1);
            }, time * 1000);
        } else if (numOfCarsFinished + 1 === numOfCars) {
            setCarTime([...carTime, { id: car.id, time: car.time }]);
            console.log(car.id + ": " + car.time);
        } else {
            numOfCarsFinished++;
            console.log(car.id + ": " + car.time);
            setCarTime([...carTime, { id: car.id, time: car.time }]);
        }
    };

    const startRace = () => {
        let cars = document.getElementsByClassName("car");
        for (let i = 0; i < cars.length; i++) {
            setSpeed(cars[i].children[0], 0);
        }
    };

    return (
        <div className="Home">
            <div className="home-content">
                <div className="cars">
                    <div className="car">
                        <img id="car1" src="./images/RacerCar.png" alt="car" />
                    </div>
                    <div className="car">
                        <img id="car2" src="./images/RacerCar.png" alt="car" />
                    </div>
                    <div className="car">
                        <img id="car3" src="./images/RacerCar.png" alt="car" />
                    </div>
                </div>
                <button onClick={() => startRace()}>Start race</button>
            </div>
        </div>
    );
};

export default Home;
