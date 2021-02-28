import questions from './api/questions.json'

export type Question = {
  id: number
  question: string
  options: string[]
}

export const total = questions.length

export const fetchQuizQuestions = () => {
  return questions.map((question: Question) => ({
    ...question
  }))
}
