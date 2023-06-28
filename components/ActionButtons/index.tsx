import Link from "next/link";
import { Back, Next } from "../SVGIcons";
import { FC } from "react";

const ActionButtons: FC<any> = ({ selectedAnswer, isLastQuestion, handleNext }) => (
  <div className="flex justify-between items-center">
    <Link href="/" className="btn btn-neutral">
      <Back />
      <span className="ml-1">Quit Quiz</span>
    </Link>
    {selectedAnswer && (
      <button className="btn btn-primary self-end w-32" onClick={handleNext}>
        <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
        <Next />
      </button>
    )}
  </div>
);

export default ActionButtons;
