import MButton from "../common/MButton.tsx";

interface StartPagePropsI {
  startTest: (res: boolean) => void;
  addQuestion: (res: boolean) => void;
}

const StartPage = ({ startTest, addQuestion }: StartPagePropsI) => {
  return (
    <div className="start__page">
      <h1>Привет, это тест по программированию!</h1>
      <h2>На выполнение теста даётся 10 минут</h2>
      <MButton onClick={() => startTest(true)}>Начать тест</MButton>
      <MButton onClick={() => addQuestion(false)}>Добавить вопрос</MButton>
    </div>
  );
};

export default StartPage;
