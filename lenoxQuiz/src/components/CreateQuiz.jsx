import { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "../../src/App.css";

import { ref, uploadBytes } from "firebase/storage";
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  if (auth?.currentUser == null) {
    navigate("/");
  }
  const [questions, setQuestions] = useState([]);

  const [newquestions, setNewQuestions] = useState("");
  const [newlevel, setNewLevel] = useState("");
  const [newanswers, setNewAnswers] = useState("");

  //update question state
  const [updatedQuestion, setUpdatedQuestion] = useState("");

  //file state
  const [fileUpload, setFileUpload] = useState(null);

  const questionsCollectionRef = collection(db, "questions");

  const getQuestions = async () => {
    //read data from db n see questionlist
    try {
      const data = await getDocs(questionsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuestions(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuestion = async (id) => {
    const questionDoc = doc(db, "questions", id);
    await deleteDoc(questionDoc);
    getQuestions();
  };

  const updateQuestion = async (id) => {
    const questionDoc = doc(db, "questions", id);
    await updateDoc(questionDoc, { title: updatedQuestion });
    getQuestions();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const onSubmitQuestion = async () => {
    try {
      await addDoc(questionsCollectionRef, {
        title: newquestions,
        level: newlevel,
        answer: newanswers,
        userId: auth?.currentUser?.uid,
      });
      getQuestions();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="createContainer">
        <p className="formHeading">Create New Questions</p>
        <div className="formContainer">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setNewQuestions(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Level"
            onChange={(e) => setNewLevel(Number(e.target.value))}
            className="input"
          />
          <input
            type="checkbox"
            checked={newanswers}
            onChange={(e) => setNewAnswers(e.target.value)}
            className=""
          />
          <label htmlFor="">Answered</label>
          <button onClick={onSubmitQuestion} className="input submitbtn">
            Submit Question
          </button>
        </div>
      </div>

      <div className="createContainer">
        <p className="formHeading">Your Questions</p>
        <div >
          {questions.map((question) => (
            <div key={question.id} className="questionBox">
              <h1 style={{ color: question.answer ? "green" : "red" }}>
                {question.title}
              </h1>
              <p>Level: {question.level} </p>

              <button
                onClick={() => deleteQuestion(question.id)}
                className="googlesigninbtn"
              >
                Delete Question
              </button>
              <div>
                <input
                  type="text"
                  placeholder="new question"
                  onChange={(e) => {
                    setUpdatedQuestion(e.target.value);
                  }}
                  className="input"
                />
                <button
                  onClick={() => {
                    updateQuestion(question.id);
                  }}
                  className="updatebtn"
                >
                  Update Question
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="uploadContainer">
          <input
            type="file"
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <button onClick={uploadFile} className="uploadbtn">
            {" "}
            Upload file
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
