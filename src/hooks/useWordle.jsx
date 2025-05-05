import { useState } from "react";

import {
  TRIALS,
  INIT_TRIALS,
  CORRECT_WORD,
  WORDLE_API_URL,
} from "../consts/wordle";

export function useWordle() {
  const [trials, setTrials] = useState(INIT_TRIALS);
  const [word, setWord] = useState("");
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctWord, setCorrectWord] = useState("");

  const fetchWordleWord = async () => {
    try {
      const response = await fetch(WORDLE_API_URL);

      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCorrectWord(randomWord);
    } catch (error) {
      console.log("CORS error:", error.message);
      setCorrectWord(CORRECT_WORD);
    }
  };

  const handleKeyPres = (event) => {
    if (isGameOver) {
      return;
    }
    const key = event.key;
    let newWord = word;
    if (key === "Backspace") {
      newWord = word.slice(0, -1);
      setWord(newWord);
    }
    if (key.match(/^\w$/i) && word.length < 5) {
      newWord = word + key;
      setWord(newWord);
    }
    setTrials((trials) =>
      trials.map((trial, idx) => (idx === currentTrial ? newWord : trial)),
    );

    if (key === "Enter" && word.length === 5) {
      setCurrentTrial((trial) => {
        if (trial + 1 >= TRIALS) {
          return trial;
        }
        return trial + 1;
      });
      setWord("");
      if (word === correctWord) {
        setIsGameOver(true);
        alert("You win!");
      }

      if (currentTrial + 1 >= TRIALS) {
        setCurrentTrial((trial) => trial + 1);
        setIsGameOver(true);
        alert("You lose!");
      }
    }
  };

  return {
    word,
    trials,
    currentTrial,
    correctWord,
    fetchWordleWord,
    handleKeyPres,
  };
}
