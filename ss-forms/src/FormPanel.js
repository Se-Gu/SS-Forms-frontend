import React, { useState } from "react";
import { toast } from "react-toastify";
import QuestionInput from "./QuestionInput";
import FormPreview from "./FormPreview";

const FormPanel = () => {
  // State variables for form data
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);

  // Function to handle adding a question
  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    // You can access the form name and questions array in the state variables (formName, questions)
    // Send the data to the backend API for saving
  };

  return (
    <div>
      {/* Form creation page */}
      <h2>Create Form</h2>
      <form onSubmit={handleSubmit}>
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
        <QuestionInput handleAddQuestion={addQuestion} />

        <button type="submit">Save Form</button>
      </form>

      {/* Form preview component */}
      <FormPreview formName={formName} questions={questions} />
    </div>
  );
};

export default FormPanel;
