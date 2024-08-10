import { useEffect, useRef, useState } from "react";
import "./css/bet.css";
import TryAgainPopup from "./TryAgainPopup";
import CarBets from "./CarBets";
import BetSizes from "./BetSizes";

const Bet = ({ cars, userBalance, userBet, setUserBet, balanceChange }) => {
    const firstUpdate = useRef(true);
    const sizesOfBet = [10, 20, 50, 100, 200];
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } else {
            balanceChangeAnimation();
            setPossibleBets();
            unclickCarBet();
            unclickSizesofBet();
        }
    }, [userBalance]);

    const setPossibleBets = () => {
        if (userBalance < sizesOfBet[0]) {
            setPopup(true);
        }

        const sizes = document.getElementsByClassName("bet-size");
        for (let i = 0; i < sizesOfBet.length; i++) {
            if (userBalance < Number(sizes[i].children[0].id.slice(8))) {
                sizes[i].children[0].disabled = true;
                sizes[i].children[0].style.backgroundColor =
                    "rgba(255, 0, 0, 0.479)";
            } else {
                sizes[i].children[0].disabled = false;
                sizes[i].children[0].style.backgroundColor = "rgb(80, 91, 255)";
            }
        }
    };

    const unclickSizesofBet = () => {
        const sizes = document.getElementsByClassName("bet-size");
        for (let i = 0; i < sizesOfBet.length; i++)
            sizes[i].children[0].style.opacity = "100%";
    };

    const unclickCarBet = () => {
        const carBets = document.getElementsByClassName("car-bet");
        for (let i = 0; i < cars.length; i++)
            carBets[i].children[0].style.opacity = "100%";
    };

    const balanceChangeAnimation = () => {
        if (!balanceChange) return;

        const animation =
            document.getElementsByClassName("balance-change")[0].children[0];

        if (Number(balanceChange) > 0) {
            animation.innerHTML = "+" + balanceChange + "$";
            animation.style.color = "green";
        } else if (Number(balanceChange) < 0) {
            animation.innerHTML = balanceChange + "$";
            animation.style.color = "red";
        }

        animation.style.opacity = "100%";
        animation.style.bottom = "0vh";
        setTimeout(() => {
            animation.style.opacity = "0%";
            setTimeout(() => {
                animation.style.bottom = "-5vh";
            }, 1000);
        }, 1000);
    };

    return (
        <div className="Bet">
            <div className="bet-content">
                <div className="user-balance">
                    <p>{userBalance} $</p>
                </div>

                <div className="balance-change">
                    <p>aaa</p>
                </div>

                <p>SIZE OF BET: </p>
                <BetSizes
                    userBet={userBet}
                    setUserBet={setUserBet}
                    unclickSizesofBet={unclickSizesofBet}
                    sizesOfBet={sizesOfBet}
                />

                <p>BET ON: </p>
                <CarBets
                    cars={cars}
                    userBet={userBet}
                    setUserBet={setUserBet}
                    unclickCarBet={unclickCarBet}
                />

                {popup && <TryAgainPopup />}
            </div>
        </div>
    );
};

export default Bet;
