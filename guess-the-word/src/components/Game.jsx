import { useState, useRef } from "react"
import "./Game.css"
const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLettters,
    guesses,
    score
}) => {

    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);
        setLetter("")
        letterInputRef.current.focus()

    }

    return (
        <div className="div">
            <p className="points">
                <span>Score: {score}</span>
            </p>
            <h1>Guess The Word:</h1>
            <h3 className="tip">Tip:
                <span> {pickedCategory
                    .charAt(0)
                    .toUpperCase()
                    + pickedCategory.slice(1)}
                </span>
            </h3>
            <p>You Have {guesses} Tries</p>
            <div className="wordContainer">
                {letters.map((l, i) => (
                    guessedLetters.includes(l) ? (
                        <span className="letter">
                            {l}
                        </span>

                    ) : (

                        <span key={i} className="blankSquare"></span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p>Try Guessing A Letter</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="letter"
                        maxLength="1"
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>Play!</button>
                </form>
            </div>
            <div className="wrongLetterContainer">
                <p>Already Tried:</p>
                {wrongLettters.map((l, i) => (
                    <span key={i}>{l.toUpperCase()}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game