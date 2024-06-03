import MButton from "../common/MButton.tsx";
import { FormEvent, useEffect, useState } from "react";
import Store from "../../store/store.ts";
import { Question } from "../../types/types.ts";
import Answers from "./Answers.tsx";

const TestComponent = () => {
  const [timer, setTimer] = useState(600);
  const [active, setActive] = useState(false);
  const [question, setQuestion] = useState<Question>(Store.questions[0]);
  const [questionsCount, setQuestionsCount] = useState(1);

  useEffect(() => {
    let interval: number = 0;
    if (active) {
      interval = setInterval(() => {
        setTimer((seconds) => seconds - 1);
      }, 1000);
    } else if (!active && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  function handleClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (active) {
      setQuestionsCount((prev) => prev + 1);
      const answer: string[] = [];
      const inputs = Array.from(
        e.target instanceof HTMLFormElement ? e.target.elements : [],
      ) as HTMLInputElement[];
      inputs.forEach((el: HTMLInputElement) => {
        if (el.checked || el.type === "text") {
          answer.push(el.value);
          el.checked = false;
          el.value = "";
        }
      });
      setQuestion(Store.getQuestion(question, answer));
    } else setActive(true);
  }

  return (
    <div className="test">
      <div className="test__timer">
        <h2>Тестирование</h2>
        <div className="test__timer__value">
          {timer >= 0
            ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
            : "0:00"}
        </div>
      </div>
      <div className="test__statusbar">
        {Store.questions.map((question, index) => (
          <div
            key={`${question.question} - ${index}`}
            className={
              index + 1 <= questionsCount
                ? index + 1 === questionsCount
                  ? "active"
                  : "default"
                : "disabled"
            }
          ></div>
        ))}
      </div>
      <div style={{ visibility: !active ? "hidden" : "visible" }}>
        <h3>{question?.question}</h3>
      </div>
      {timer < 1 ? (
        <div>
          <h2>К сожалению, ваше время вышло, попробуйте ещё раз!</h2>
          <MButton onClick={() => window.location.reload()}>
            Начать заново
          </MButton>
        </div>
      ) : active ? (
        <Answers handleClick={handleClick} timer={timer} question={question} />
      ) : (
        <MButton
          onClick={handleClick}
          visible
          disabled={timer < 1}
          type="submit"
        >
          Начать
        </MButton>
      )}
      {questionsCount - 1 >= Store.questions.length && (
        <div className="test__result">
          <h2>
            Ваш результат: {Store.result.length}/{Store.questions.length}
          </h2>
          <MButton onClick={() => window.location.reload()}>
            Начать заново
          </MButton>
        </div>
      )}
    </div>
  );
};

export default TestComponent;
