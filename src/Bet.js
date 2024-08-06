import { useEffect, useRef, useState } from "react";
import "./css/bet.css";

const Bet = ({
    cars,
    userBalance,
    userBet,
    setUserBalance,
    setUserBet,
    balanceChange,
}) => {
    const firstUpdate = useRef(true);
    const [sizesOfBet, setSizesOfBet] = useState([10, 20, 50, 100]);
    const [betSize, setBetSize] = useState(10);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } else {
            balanceChangeAnimation();
        }
    }, [balanceChange]);

    const unclickSizesofBet = () => {
        const sizes = document.getElementsByClassName("bet-size");
        for (let i = 0; i < sizesOfBet.length; i++)
            sizes[i].children[0].style.opacity = "100%";
    };

    const balanceChangeAnimation = () => {
        if (!balanceChange) return;

        setTimeout(() => {
            const animation =
                document.getElementsByClassName("balance-change")[0]
                    .children[0];

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
        }, 500);
    };

    const handleBetSizeClick = (e) => {
        setBetSize(Number(e.target.id.slice(8)));
        unclickSizesofBet();
        e.target.style.opacity = "50%";
        console.log(e.target.id.slice(8));
    };

    const handleBetClick = (e) => {
        let temp = userBet;
        temp.car = e.target.id;
        temp.bet += betSize;
        setUserBet(temp);
        setUserBalance(userBalance - betSize);
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
                <div className="sizes-of-bet">
                    {sizesOfBet &&
                        sizesOfBet.map((bet) => (
                            <div key={bet} className="bet-size">
                                <button
                                    id={"bet-size" + bet}
                                    onClick={(e) => handleBetSizeClick(e)}
                                >
                                    {bet}$
                                </button>
                            </div>
                        ))}
                </div>

                <p>BET ON: </p>
                <div className="bets">
                    {cars &&
                        cars.map((car) => (
                            <div key={car.id} className="car-bet">
                                <button
                                    id={"bet" + car.id}
                                    onClick={(e) => handleBetClick(e)}
                                >
                                    CAR {car.id}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Bet;
