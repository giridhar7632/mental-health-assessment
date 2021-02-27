import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import "./styles.css";

const TOTAL_QUESTIONS = 10;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [endQuiz, setEndQuiz] = useState(0);

  const startQuiz = async () => {};
  const getScore = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestion = () => {};
  return (
    <div className="App">
      <h1>
        Take Assessment!{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>
      <button className="start" onClick={startQuiz}>
        Start
      </button>
      <p>Loading Questions...</p>
      <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        options={questions[number].options}
        callback={getScore}
      />
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}
