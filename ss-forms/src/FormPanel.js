import React, { useState } from "react";
import { toast } from "react-toastify";
import QuestionInput from "./QuestionInput";

const FormPanel = () => {
  // State variables for form data
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);

  // Function to handle adding a question
  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  // Function to handle updating a question
  const updateQuestion = (index, question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = question;
    setQuestions(updatedQuestions);
  };

  // Function to handle deleting a question
  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form name: ", formName);
    console.log("Questions ", questions);
    // Implement form submission logic here
    // You can access the form name and questions array in the state variables (formName, questions)
    // Send the data to the backend API for saving
  };

  return (
    <div>
      {/* Form creation page */}
      <h2>Create Form</h2>
      <form>
        <label>
          Form Name:
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
          />
        </label>

        {/* Question input component */}
        <QuestionInput
          questions={questions}
          handleAddQuestion={addQuestion}
          handleUpdateQuestion={updateQuestion}
          handleDeleteQuestion={deleteQuestion}
        />

        <button type="submit" onClick={handleSubmit}>
          Save Form
        </button>
      </form>
    </div>
  );
};

export default FormPanel;
