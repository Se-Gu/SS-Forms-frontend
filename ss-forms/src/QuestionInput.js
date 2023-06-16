import React, { useState } from "react";

const QuestionInput = ({
  questions,
  handleAddQuestion,
  handleUpdateQuestion,
  handleDeleteQuestion,
}) => {
  const [promptInput, setPromptInput] = useState("");
  const [typeInput, setTypeInput] = useState("text");
  const [optionsInput, setOptionsInput] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editOptionIndex, setEditOptionIndex] = useState(-1);

  const addOptionHandler = () => {
    if (optionInput.trim() !== "") {
      setOptionsInput((prevOptions) => [...prevOptions, optionInput]);
      setOptionInput("");
    }
  };

  const updateOptionHandler = (index, value) => {
    const updatedOptions = [...optionsInput];
    updatedOptions[index] = value;
    setOptionsInput(updatedOptions);
  };

  const deleteOptionHandler = (index) => {
    const updatedOptions = [...optionsInput];
    updatedOptions.splice(index, 1);
    setOptionsInput(updatedOptions);
    if (editOptionIndex === index) {
      setEditOptionIndex(-1);
    }
  };

  const addQuestionHandler = () => {
    if (editIndex > -1) {
      // Update existing question
      const question = {
        prompt: promptInput,
        type: typeInput,
        options: optionsInput,
      };
      handleUpdateQuestion(editIndex, question);
      setEditIndex(-1);
    } else {
      // Add new question
      const question = {
        prompt: promptInput,
        type: typeInput,
        options: optionsInput,
      };
      handleAddQuestion(question);
    }
    setPromptInput("");
    setTypeInput("text");
    setOptionsInput([]);
  };

  const deleteQuestionHandler = (index) => {
    handleDeleteQuestion(index);
  };

  const editQuestionHandler = (index) => {
    const question = questions[index];
    setPromptInput(question.prompt);
    setTypeInput(question.type);
    setOptionsInput(question.options);
    setEditIndex(index);
  };

  return (
    <div>
      <h2>Add/Edit Question</h2>
      <label>
        Prompt:
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
        />
      </label>
      <label>
        Type:
        <select
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="longtext">Long Text</option>
          <option value="numeric">Numeric</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </label>
      {typeInput === "dropdown" || typeInput === "checkbox" ? (
        <div>
          <label>
            Options:
            <input
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
            />
            <button onClick={addOptionHandler}>Add Option</button>
          </label>
          <ul>
            {optionsInput.map((option, index) => (
              <li key={index}>
                {editOptionIndex === index ? (
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOptionHandler(index, e.target.value)}
                  />
                ) : (
                  <span>{option}</span>
                )}
                {editOptionIndex === index ? (
                  <button onClick={() => setEditOptionIndex(-1)}>Done</button>
                ) : (
                  <>
                    <button onClick={() => setEditOptionIndex(index)}>
                      Edit
                    </button>
                    <button onClick={() => deleteOptionHandler(index)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <button type="button" onClick={addQuestionHandler}>
        {editIndex > -1 ? "Update Question" : "Add Question"}
      </button>

      {questions.map((question, index) => (
        <div key={index}>
          <p>Prompt: {question.prompt}</p>
          <p>Type: {question.type}</p>
          {question.options.length > 0 && (
            <div>
              <p>Options:</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={() => editQuestionHandler(index)}>Edit</button>
          <button onClick={() => deleteQuestionHandler(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default QuestionInput;
