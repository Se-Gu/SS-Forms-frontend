import React, { useState } from 'react';

const FormPanel = () => {
    const [formTitle, setFormTitle] = useState('');
    const [formQuestions, setFormQuestions] = useState(['', '', '']);
    const [forms, setForms] = useState([]);
    const [delformname, setdelFormname] = useState('');
    const [form_answers, setFormAnswers] = useState([]);

    
      const handleCreateForm = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/forms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: formTitle, questions: formQuestions }),
            });
      
            const data = await response.json();
      
            if (response.ok) {
                // Form created successfully
                console.log(data.msg);
            } else {
                // Form not created, error occurred
                console.error(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleQuestionChange = (e, index) => {
      const updatedQuestions = [...formQuestions];
      updatedQuestions[index] = e.target.value;
      setFormQuestions(updatedQuestions);
    };
    const getForms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getforms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Forms retrieved successfully
          console.log(data);
          setForms(data);
        } else {
          // Error retrieving forms
          console.error(data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleDeleteForm = async (title) => {
      try {
          const response = await fetch(`http://localhost:5000/api/forms/${title}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          const data = await response.json();
  
          if (response.ok) {
              // Form deleted successfully
              console.log(data.msg);
          } else {
              // Form not found or other error
              console.error(data.msg);
          }
      } catch (error) {
          // Error occurred
          console.error('Error:', error);
      }
  };
  const getFormAnswers = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/get_form_answers');
        const data = await response.json();

        if (response.ok) {
            console.log(data);
            setFormAnswers(data);
            // Here you can process the data and update your component's state or props as necessary
        } else {
            console.error('Failed to fetch form answers:', data.msg);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
  
  return (
    <div>
    <div className="container">
    <div className="create-form-container">
  <input
    type="text"
    placeholder="Form Title"
    value={formTitle}
    onChange={(e) => setFormTitle(e.target.value)}
  />
  <div className="form-questions">
    <h2>Form Questions</h2>
    {formQuestions.map((question, index) => (
      <input
        key={index}
        type="text"
        placeholder={`Question ${index + 1}`}
        value={question}
        onChange={(e) => handleQuestionChange(e, index)}
      />
    ))}
  </div>
  <button onClick={handleCreateForm}>Create Form</button>
</div>
<br></br>
<div className="delete-user-container">
      <input
        type="text"
        placeholder="Form Title"
        value={delformname}
        onChange={(e) => setdelFormname(e.target.value)}
      />
      <button onClick={() => handleDeleteForm(delformname)}>Delete Form</button>
    </div>
    <div className="container">
<div className="form-list-container">
      <h1>Forms List</h1>
      <button onClick={getForms}>Get Forms</button>
      {forms.map((form, index) => (
        <div key={index}>
          <h2>{form.title}</h2>
          <ul>
            {form.questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="form-list-container">
      <h1>Form Answers List</h1>
      <button onClick={getFormAnswers}>Get Form Answers</button>
      {form_answers.map((forms, index) => (
        <div key={index}>
          <h2>{forms.form_title}</h2>
          <h2>{forms.username}</h2>
          <ul>
            {forms.answers.map((answers, index) => (
              <li key={index}>{answers}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
</div>
</div>
  );
};

export default FormPanel;