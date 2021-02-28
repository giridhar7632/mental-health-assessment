import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { total, fetchQuizQuestions } from './API'
import './styles.css'
import { Question } from './API'

export type AnswerObject = {
  question: string
  answer: string
  score: number
}

const TOTAL_QUESTIONS = total

export default function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [endQuiz, setEndQuiz] = useState(true)
  const [prevBtn, setPrevBtn] = useState(true)

  const startQuiz = async () => {
    setLoading(true)
    setEndQuiz(false)

    const newQuestions = await fetchQuizQuestions()
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setEndQuiz(true)
    } else {
      setNumber(nextQuestion)
      setPrevBtn(false)
    }
  }
  const prevQuestion = () => {
    const prevQuestion = number - 1
    if (prevQuestion < 0) {
      setPrevBtn(true)
    } else {
      let prevScore = userAnswers[number - 1].score
      setScore((prev) => prev - Number(prevScore))
      setNumber(prevQuestion)
      userAnswers.pop()
    }
  }

  const quizScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!endQuiz) {
      const answer = e.currentTarget.value
      if (answer)
        setScore(
          (prev) => prev + Number(questions[number].options.indexOf(answer) + 1)
        )

      const answerObject = {
        question: questions[number].question,
        answer,
        score: Number(questions[number].options.indexOf(answer) + 1)
      }
      setUserAnswers((prev) => [...prev, answerObject])
      setTimeout(() => nextQuestion(), 2000)
    }
  }

  return (
    <div className="App">
      <h1>
        Take Assessment!{' '}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>
      {endQuiz || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}
      <p>{score}</p>
      {loading && <p>Loading Questions...</p>}
      {!loading && !endQuiz && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          options={questions[number].options}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={quizScore}
        />
      )}
      {!loading && !endQuiz && (
        <button className="prev" onClick={prevQuestion} disabled={prevBtn}>
          Previous Question
        </button>
      )}
      {!endQuiz &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  )
}
