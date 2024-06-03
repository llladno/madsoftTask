import "./App.scss";
import StartPage from "./components/layout/StartPage.tsx";
import { useState } from "react";
import TestComponent from "./components/layout/TestComponent.tsx";
import AddQuestion from "./components/layout/AddQuestion.tsx";

function App() {
  const [showTest, setShowTest] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  return (
    <div className="main__container">
      {!showTest && !showAddQuestion ? (
        <StartPage
          startTest={(res: boolean) => setShowTest(res)}
          addQuestion={() => setShowAddQuestion(true)}
        ></StartPage>
      ) : (
        showTest && <TestComponent />
      )}
      {showAddQuestion && (
        <AddQuestion setShowAddQuestion={() => setShowAddQuestion(false)} />
      )}
    </div>
  );
}

export default App;
