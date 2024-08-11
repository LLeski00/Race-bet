import { useState } from "react";
import "./css/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const numOfCarsOpt = [2, 3, 4, 5];
    const speedOpts = [100, 200, 300];
    const numOfChangesOpt = [0, 1, 2, 5, 10];
    const [numOfCars, setNumOfCars] = useState();
    const [minLengthOfRace, setMinLengthOfRace] = useState();
    const [maxLengthOfRace, setMaxLengthOfRace] = useState();
    const [numOfChanges, setNumOfChanges] = useState();

    const unclickSpeeds = () => {
        const speeds = document.getElementsByClassName("speed-opt");
        for (let i = 0; i < speedOpts.length; i++)
            speeds[i].children[0].style.opacity = "100%";
    };

    const handleSpeedClick = (e) => {
        switch (e.target.innerHTML) {
            case "100km/h":
                setMinLengthOfRace(5);
                setMaxLengthOfRace(6);
                break;
            case "200km/h":
                setMinLengthOfRace(4);
                setMaxLengthOfRace(5);
                break;
            case "300km/h":
                setMinLengthOfRace(3);
                setMaxLengthOfRace(4);
                break;
            default:
                break;
        }
        unclickSpeeds();
        e.target.style.opacity = "50%";
    };

    const unclickNumOfCars = () => {
        const numOfCars = document.getElementsByClassName("num-of-car-opt");
        for (let i = 0; i < numOfCarsOpt.length; i++)
            numOfCars[i].children[0].style.opacity = "100%";
    };

    const handleNumOfCarsClick = (e) => {
        setNumOfCars(e.target.innerHTML);
        unclickNumOfCars();
        e.target.style.opacity = "50%";
    };

    const unclickNumOfChanges = () => {
        const numOfChanges =
            document.getElementsByClassName("num-of-change-opt");
        for (let i = 0; i < numOfChangesOpt.length; i++)
            numOfChanges[i].children[0].style.opacity = "100%";
    };

    const handleNumOfChangeClick = (e) => {
        setNumOfChanges(e.target.innerHTML);
        unclickNumOfChanges();
        e.target.style.opacity = "50%";
    };

    const handleStartGameClick = () => {
        let raceSettings = "/";
        raceSettings += numOfCars + "x";
        raceSettings += minLengthOfRace + "x";
        raceSettings += maxLengthOfRace + "x";
        raceSettings += numOfChanges;

        navigate(raceSettings);
    };

    return (
        <div className="Home">
            <div className="home-content">
                <h1>RACE BET</h1>
                <p>Number of cars: </p>
                <div className="num-of-cars-opt">
                    {numOfCarsOpt.map((num) => (
                        <div
                            key={"num-of-car" + num}
                            className="num-of-car-opt"
                        >
                            <button onClick={(e) => handleNumOfCarsClick(e)}>
                                {num}
                            </button>
                        </div>
                    ))}
                </div>
                <p>Average speed:</p>
                <div className="speed-opts">
                    {speedOpts.map((num) => (
                        <div key={"car-speed" + num} className="speed-opt">
                            <button onClick={(e) => handleSpeedClick(e)}>
                                {num}km/h
                            </button>
                        </div>
                    ))}
                </div>
                <p>Number of changes of speed:</p>
                <div className="num-of-changes-opts">
                    {numOfChangesOpt.map((num) => (
                        <div
                            key={"num-of-change" + num}
                            className="num-of-change-opt"
                        >
                            <button onClick={(e) => handleNumOfChangeClick(e)}>
                                {num}
                            </button>
                        </div>
                    ))}
                </div>

                {numOfCars &&
                    maxLengthOfRace &&
                    minLengthOfRace &&
                    numOfChanges && (
                        <div className="start-game-button">
                            <button onClick={() => handleStartGameClick()}>
                                Start game
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Home;
