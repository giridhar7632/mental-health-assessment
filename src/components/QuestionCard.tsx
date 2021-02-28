import React from 'react'
import { AnswerObject } from '../App'

type Props = {
  question: string
  options: string[]
  userAnswer: AnswerObject | undefined
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  questionNr: number
  totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  options,
  userAnswer,
  callback,
  questionNr,
  totalQuestions
}) => (
  <div>
    <p className="number">
      Question {questionNr}/{totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {options.map((option) => (
        <div key={option}>
          <button disabled={!!userAnswer} value={option} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: option }}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default QuestionCard
