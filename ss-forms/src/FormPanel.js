import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
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
    <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Form creation page */}
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Create Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <TextField
            id="form-name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
            label="Form Name"
            fullWidth
            margin="normal"
          />
        </FormControl>

        {/* Question input component */}
        <QuestionInput
          questions={questions}
          handleAddQuestion={addQuestion}
          handleUpdateQuestion={updateQuestion}
          handleDeleteQuestion={deleteQuestion}
        />

        <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
          Save Form
        </Button>
      </form>
    </Box>
  );
};

export default FormPanel;
