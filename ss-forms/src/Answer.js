import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Answers = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchForms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/forms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          let allAnswers = [];
          data.forEach((form) => {
            form.formQuestions.forEach((question) => {
              question.answers?.forEach((answer, idx) => {
                allAnswers.push({
                  id: `${form.id}_${question.id}_${idx}`,
                  formName: form.formName,
                  question: question.prompt,
                  username: answer.username,
                  answer: answer.answer
                });
              });
            });
          });
          setAnswers(allAnswers);
          console.log("Fetched forms and answers:", data);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchForms();
  }, []);

  const columns = [
    { field: 'formName', headerName: 'Form Name', width: 200 },
    { field: 'question', headerName: 'Question', width: 300 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'answer', headerName: 'Answer', width: 300 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={answers} columns={columns} pageSize={5} />
    </div>
  );
};

export default Answers;
