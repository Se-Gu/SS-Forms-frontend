import React, { useEffect, useState } from "react";
import {
    Button,
    MenuItem,
    Select,
    Typography,
    FormControl,
    TextField, // Add this import statement
  } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";

const CenteredContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const FormList = styled("ul")({
  paddingLeft: 0,
  marginTop: 0,
  marginBottom: "1rem",
  listStyleType: "none",
});

const FormListItem = styled("li")({
  display: "flex",
  alignItems: "center",
  marginBottom: "0.5rem",
});

const EditForm = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/forms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        toast.error("Failed to fetch forms");
      } else {
        setForms(data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch forms");
    }
  };

  const deleteForm = async (formId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/forms/${formId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        fetchForms();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("There was an error deleting the form");
      console.error("Error:", error);
    }
  };

  const handleFormChange = (event) => {
    const selectedFormId = event.target.value;
    const selectedForm = forms.find((form) => form.id === selectedFormId);
    setSelectedForm(selectedForm);
    setQuestions(selectedForm?.formQuestions || []);
  };

  const handleQuestionChange = (event, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].prompt = event.target.value;
    setQuestions(updatedQuestions);
  };
  
  const handleTypeChange = (event, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = event.target.value;
    setQuestions(updatedQuestions);
  };
  
  const updateForm = async () => {
    const token = localStorage.getItem("token");
    const updatedForm = {
      ...selectedForm,
      formQuestions: questions
    };

    delete updatedForm._id; // Make sure not to include _id in updatedForm

    try {
      const response = await fetch(
        `http://localhost:5000/api/forms/${selectedForm.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedForm),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.msg);
        fetchForms(); // Update the forms list
      } else {
        toast.error(data.msg);
        console.error(data); // Log server response
      }
    } catch (error) {
      toast.error("There was an error updating the form");
      console.error("Error:", error);
    }
  };

  return (
    <CenteredContainer>
      <Typography variant="h5" gutterBottom>
        Edit Forms
      </Typography>
      <FormList>
        <FormListItem>
          <Select
            value={selectedForm?.id || ""}
            onChange={handleFormChange}
            displayEmpty
            inputProps={{ "aria-label": "Select a form" }}
          >
            <MenuItem value="" disabled>
              Select a form
            </MenuItem>
            {forms.map((form) => (
              <MenuItem key={form.id} value={form.id}>
                {form.formName}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="outlined"
            onClick={() => deleteForm(selectedForm.id)}
            size="small"
            disabled={!selectedForm}
          >
            Delete
          </Button>
        </FormListItem>
      </FormList>
      {questions.length > 0 && (
        <div>
          {questions.map((question, index) => (
            <FormControl key={question.id} fullWidth sx={{ marginBottom: "1rem" }}>
              <TextField
                label="Question"
                defaultValue={question.prompt}
                onBlur={(event) => handleQuestionChange(event, index)}
              />
              <Select
                label="Type"
                value={question.type}
                onChange={(event) => handleTypeChange(event, index)}
                displayEmpty
                inputProps={{ "aria-label": "Select a type" }}
              >
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"longtext"}>Long Text</MenuItem>
                <MenuItem value={"numeric"}>Numeric</MenuItem>
                <MenuItem value={"dropdown"}>Dropdown</MenuItem>
                <MenuItem value={"checkbox"}>Checkbox</MenuItem>
              </Select>
            </FormControl>
          ))}
          <Button
            variant="contained"
            sx={{ marginTop: "1rem" }}
            fullWidth
            onClick={updateForm}
          >
            Save Form
          </Button>
        </div>
      )}
    </CenteredContainer>
  );
};

export default EditForm;
