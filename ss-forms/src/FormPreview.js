import React from "react";

const FormPreview = ({ formName, questions }) => {
  return (
    <div>
      <h2>Form Preview</h2>
      <h3>Form Name: {formName}</h3>
      <h3>Questions:</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <p>Prompt: {question.prompt}</p>
          <p>Type: {question.type}</p>
          {question.options.length > 0 && (
            <div>
              <p>Options:</p>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormPreview;
