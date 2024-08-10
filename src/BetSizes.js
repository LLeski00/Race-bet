import "./css/betSizes.css";

const BetSizes = ({ userBet, setUserBet, unclickSizesofBet, sizesOfBet }) => {
    const handleBetSizeClick = (e) => {
        let temp = userBet;
        temp.car = userBet.car;
        temp.bet = Number(e.target.id.slice(8));
        setUserBet(temp);
        unclickSizesofBet();
        e.target.style.opacity = "50%";
    };

    return (
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
    );
};

export default BetSizes;
