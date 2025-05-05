import Letter from "./letter";

const WORD_LENGTH = 5;
const WORD_ARRAY = new Array(WORD_LENGTH).fill(null);

const CORRECT_LETTER = "bg-green-500 border-0";
const WRONG_LETTER = "bg-gray-200 border-0";
const ALMOST_CORRECT_LETTER = "bg-yellow-500 border-0";

const paintWord = (word, correctWord, idx) => {
  if (word[idx] === correctWord[idx]) {
    return CORRECT_LETTER;
  }
  if (correctWord.includes(word[idx])) {
    return ALMOST_CORRECT_LETTER;
  }
  return WRONG_LETTER;
};

export default function Word({ word, correctWord, proceed }) {
  return (
    <div className="flex gap-2">
      {WORD_ARRAY.map((letter, idx) => (
        <Letter
          letter={word ? word[idx] : null}
          key={`letter-${letter}-${idx}`}
          className={proceed ? paintWord(word, correctWord, idx) : ""}
        />
      ))}
    </div>
  );
}
