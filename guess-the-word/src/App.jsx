//CSS

import './App.css';

//Components

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//React

import { useCallback, useEffect, useState } from "react";

//data 

import { wordsList } from "./data/words"

const stages = [
  { id: 0, name: "start" },
  { id: 1, name: "game" },
  { id: 2, name: "end" },
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLettters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)


  const pickWordAndCategory = useCallback(() => {
    //Choose random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    //Choose random word
    const word = words[category]
    const randomWord = word[Math.floor(Math.random() * words[category].length)]

    return [randomWord, category]
  }, [words])

  //Starts the game
  const startGame = useCallback (() => {
    //clear all letters
    clearLetterStates();
    //Pick word and category
    const [randomWord, category] = pickWordAndCategory();

    //Array of letters
    let splittedLetter = randomWord.split("")

    splittedLetter = splittedLetter.map((l) => l.toLowerCase())

    //Set states
    setPickedWord(randomWord)
    setPickedCategory(category)
    setLetters(splittedLetter)
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  //Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //Check if the letter has already being utilized
    if (
      guessedLetters.includes(normalizedLetter)
      || wrongLettters.includes(normalizedLetter)

    ) {
      return;
    }
    //Push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]
      )
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    //Win condition
    if(guessedLetters.length == uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100)

      //Restart Game
      startGame();
    }
  }, [guessedLetters, letters, startGame])



  //Restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage == "start" && <StartScreen startGame={startGame} />}
      {gameStage == "game" && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLettters={wrongLettters}
        guesses={guesses}
        score={score}
      />}
      {gameStage == "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
