import React, { useState } from "react";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

const OptionsList = styled("ul")({
  paddingLeft: 0,
  marginTop: 0,
  marginBottom: "1rem",
  listStyleType: "none",
});

const OptionListItem = styled("li")({
  display: "flex",
  alignItems: "center",
  marginBottom: "0.5rem",
});

const OptionInput = styled(TextField)({
  marginRight: "0.5rem",
});

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

  const addQuestion = () => {
    const question = {
      prompt: promptInput,
      type: typeInput,
      options: optionsInput,
    };
    handleAddQuestion(question);
    setPromptInput("");
    setTypeInput("text");
    setOptionsInput([]);
    setOptionInput("");
  };

  const deleteQuestion = (index) => {
    handleDeleteQuestion(index);
  };

  const addOption = () => {
    if (optionInput.trim() !== "") {
      setOptionsInput([...optionsInput, optionInput]);
      setOptionInput("");
    }
  };

  const deleteOption = (index) => {
    const updatedOptions = [...optionsInput];
    updatedOptions.splice(index, 1);
    setOptionsInput(updatedOptions);
  };

  return (
    <div>
      {/* Question input */}
      <Typography variant="h5" gutterBottom>
        Add/Edit Question
      </Typography>
      <TextField
        label="Prompt"
        value={promptInput}
        onChange={(e) => setPromptInput(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Type"
        value={typeInput}
        onChange={(e) => setTypeInput(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="text">Text</MenuItem>
        <MenuItem value="longtext">Long Text</MenuItem>
        <MenuItem value="numeric">Numeric</MenuItem>
        <MenuItem value="dropdown">Dropdown</MenuItem>
        <MenuItem value="checkbox">Checkbox</MenuItem>
      </TextField>
      {(typeInput === "dropdown" || typeInput === "checkbox") && (
        <div>
          <Typography variant="subtitle1">Options:</Typography>
          <OptionsList>
            {optionsInput.map((option, index) => (
              <OptionListItem key={index}>
                <OptionInput
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...optionsInput];
                    updatedOptions[index] = e.target.value;
                    setOptionsInput(updatedOptions);
                  }}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => deleteOption(index)}
                >
                  Delete
                </Button>
              </OptionListItem>
            ))}
          </OptionsList>
          <TextField
            label="Option"
            value={optionInput}
            onChange={(e) => setOptionInput(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="outlined"
            size="small"
            onClick={addOption}
            disabled={optionInput.trim() === ""}
          >
            Add Option
          </Button>
        </div>
      )}
      <Button
        variant="contained"
        onClick={addQuestion}
        disabled={promptInput.trim() === ""}
      >
        Add Question
      </Button>

      {/* Display added questions */}
      {questions.map((question, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            Prompt: {question.prompt}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Type: {question.type}
          </Typography>
          {question.options.length > 0 && (
            <div>
              <Typography variant="subtitle1">Options:</Typography>
              <OptionsList>
                {question.options.map((option, optionIndex) => (
                  <OptionListItem key={optionIndex}>
                    <Typography>{option}</Typography>
                  </OptionListItem>
                ))}
              </OptionsList>
            </div>
          )}
          <Button
            variant="outlined"
            onClick={() => deleteQuestion(index)}
            size="small"
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuestionInput;
