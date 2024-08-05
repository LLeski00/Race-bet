import { useEffect, useState } from "react";
import "./css/home.css";

const Home = () => {
    const numOfChanges = 0;
    const numOfCars = 3;
    const maxLengthOfRace = 5;
    const minLengthOfRace = 3;
    const lengthOfSection = 75 / (1 + numOfChanges);
    const maxTimeOfSection = maxLengthOfRace / (1 + numOfChanges);
    const minTimeOfSection = minLengthOfRace / (1 + numOfChanges);
    let numOfCarsFinished = 0;
    const [cars, setCars] = useState([]);
    const [winner, setWinner] = useState();

    useEffect(() => {
        const temp = Array(numOfCars)
            .fill()
            .map((_, index) => ({
                id: index + 1,
                time: 0,
            }));
        setCars(temp);
    }, []);

    const checkWinner = () => {
        setTimeout(() => {
            let temp = maxLengthOfRace;
            for (let i = 0; i < numOfCars; i++) {
                if (cars[i].time < temp) {
                    temp = cars[i].time;
                    setWinner(cars[i].id);
                }
            }
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
        if (iteration === 0) car.time = time;
        else car.time += time;
        car.style.transition = `left ${time}s linear`;
        car.style.left = lengthOfSection * (iteration + 1) + "vw";

        if (iteration < numOfChanges) {
            setTimeout(() => {
                setSpeed(car, iteration + 1);
            }, time * 1000);
        } else {
            numOfCarsFinished++;
            updateCar(car);
            console.log(car.id + ": " + car.time);
            if (numOfCarsFinished === numOfCars) checkWinner();
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
                <button onClick={() => startRace()}>Start race</button>
            </div>
        </div>
    );
};

export default Home;
