import { Route, Routes } from "react-router-dom";
import { Auth } from "./components/auth";
import CreateQuiz from "./components/CreateQuiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/create" element={<CreateQuiz />} />
      </Routes>
    </>
  );
}

export default App;
