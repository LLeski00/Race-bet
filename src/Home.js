import { useEffect } from "react";
import "./css/home.css";

const Home = () => {
    useEffect(() => {
        startRace();
    }, []);

    const startRace = () => {
        let car = document.getElementsByClassName("car");
    };

    return (
        <div className="Home">
            <div className="home-content">
                <h1>Hello</h1>
                <div className="car">
                    <img id="car1" src="Icon.png" alt="car" />
                </div>
            </div>
        </div>
    );
};

export default Home;
