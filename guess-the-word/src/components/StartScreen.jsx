import "./StartScreen.css"
import playIcon from "../assets/4028535.png"
const StartScreen = ({startGame}) => {
    return (
        <>
            <div className="start">
                <h1>Guess The Word</h1>
                <p>Click Here To Start Playng</p>
                <a onClick={startGame} id="play" href="#">
                    <img className="play_icon" src={playIcon} alt="Play" />
                </a>

            </div>
        </>
    )
}

export default StartScreen