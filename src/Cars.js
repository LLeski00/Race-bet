import "./css/cars.css";

const Cars = ({ cars }) => {
    return (
        <div className="cars">
            {cars &&
                cars.map((car) => (
                    <div key={car.id} className="car">
                        <img
                            className="track"
                            src="./images/Track.jpg"
                            alt="track"
                        />
                        <img
                            className="finish-line"
                            src="./images/FinishLine.jpg"
                            alt="finish"
                        />
                        <img
                            id={car.id}
                            className="car-img"
                            src="./images/RacerCar.png"
                            alt="car"
                        ></img>
                    </div>
                ))}
        </div>
    );
};

export default Cars;
