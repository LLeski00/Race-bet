import "./css/home.css";

const Home = () => {

    const startRace = () => {
        let cars = document.getElementsByClassName("car");
        for(let i = 0; i < cars.length; i++) {
            console.log(cars.length);
            cars[i].children[0].style.animation= "moveRight 2s linear forwards";
        }
    };

    return (
        <div className="Home">
            <div className="home-content">
                <h1>Hello</h1>
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
                <button onClick={()=>startRace()}>Start race</button>
            </div>
        </div>
    );
};

export default Home;