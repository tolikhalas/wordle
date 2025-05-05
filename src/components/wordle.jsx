import React, { useEffect } from "react";
import Word from "./word";
import { useWordle } from "../hooks/useWordle";

export default function Wordle() {
  const {
    word,
    trials,
    currentTrial,
    correctWord,
    fetchWordleWord,
    handleKeyPres,
  } = useWordle();

  useEffect(() => {
    fetchWordleWord();
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPres);
    return () => window.removeEventListener("keydown", handleKeyPres);
  }, [word, trials, currentTrial]);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Wordle</h1>
      <section className="flex flex-col gap-2">
        {trials.map((trial, idx) => (
          <Word
            key={idx}
            word={trial ?? ""}
            proceed={currentTrial > idx}
            correctWord={correctWord}
          />
        ))}
      </section>
    </main>
  );
}
