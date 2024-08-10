import { useEffect } from "react";
import "./css/tryAgainPopup.css";

const TryAgainPopup = () => {
    useEffect(() => {
        popupPrompt();
    }, []);

    const resetGame = () => {
        window.location.reload();
    };

    const popupPrompt = () => {
        const popup = document.getElementsByClassName("popup-content")[0];
        const bet = document.getElementsByClassName("bet-content")[0];
        const carsDiv = document.getElementsByClassName("cars")[0];
        const controlBar = document.getElementsByClassName("ControlBar")[0];
        for (let i = 0; i < 6; i++) {
            bet.children[i].style.transition = "opacity 1s linear";
            bet.children[i].style.opacity = "50%";
        }
        carsDiv.style.transition = "opacity 1s linear";
        carsDiv.style.opacity = "50%";
        controlBar.style.transition = "opacity 1s linear";
        controlBar.style.opacity = "50%";
        popup.classList.toggle("show");
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <p>You lost!</p>
                <button onClick={() => resetGame()}>Try again</button>
            </div>
        </div>
    );
};

export default TryAgainPopup;
