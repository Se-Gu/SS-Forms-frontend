import React, { useState } from "react";

const QuestionInput = ({ handleAddQuestion }) => {
  const [promptInput, setPromptInput] = useState("");
  const [typeInput, setTypeInput] = useState("text");
  const [optionsInput, setOptionsInput] = useState([]);
  const [optionInput, setOptionInput] = useState("");

  const addOptionHandler = () => {
    if (optionInput.trim() !== "") {
      setOptionsInput((prevOptions) => [...prevOptions, optionInput]);
      setOptionInput("");
    }
  };

  const addQuestionHandler = () => {
    const question = {
      prompt: promptInput,
      type: typeInput,
      options: optionsInput,
    };
    handleAddQuestion(question);
    setPromptInput("");
    setTypeInput("text");
    setOptionsInput([]);
  };

  return (
    <div>
      <h2>Add Question</h2>
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
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <button onClick={addQuestionHandler}>Add Question</button>
    </div>
  );
};

export default QuestionInput;
