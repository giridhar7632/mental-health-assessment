import React from "react";

type Props = {
  question: string;
  prevQuestion: string;
  nextQuestion: string;
  options: string[];
  callback: any;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  prevQuestion,
  nextQuestion,
  options,
  callback,
  questionNr,
  totalQuestions
}) => (
  <div>
    <p className="number">
      Quesrion {questionNr}/{totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {options.map((option) => (
        <div>
          <button onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: option }}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
