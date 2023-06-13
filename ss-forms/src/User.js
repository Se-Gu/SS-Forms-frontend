import React, { useState,useEffect } from 'react';

const User = () => {
  const [forms, setForms] = useState([]);
  const [answers, setAnswers] = useState({});
  const username = localStorage.getItem('username');
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
  useEffect(() => {
    const newAnswers = {};
    forms.forEach((form, i) => {
      newAnswers[i] = {
        title: form.title,
        username: username,
        answers: form.questions.map(() => '')
      };
    });
    setAnswers(newAnswers);
  }, [forms, username]);

  const handleInputChange = (formIndex, questionIndex, event) => {
    if (answers[formIndex]) {
      const newAnswers = { ...answers };
      newAnswers[formIndex].answers[questionIndex] = event.target.value;
      setAnswers(newAnswers);
    }
  };

  const handleSubmitForm = async (formIndex) => {
    if (answers[formIndex]) {
        const submission = [
            answers[formIndex].title,
            answers[formIndex].username,
            ...answers[formIndex].answers
        ];

        try {
            const response = await fetch('http://localhost:5000/api/submit_form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ form_title: submission[0], username: submission[1], answers: submission.slice(2) }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Form submitted successfully
                console.log(data.msg);
            } else {
                // Form not submitted, error occurred
                console.error(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};


  return (
    <div className="container">
      <h1>User Panel</h1>
      <div className="form-list-container">
        <h1>Forms List</h1>
        <button onClick={getForms}>Get Forms</button>
        {forms.map((form, formIndex) => (
          <div key={formIndex}>
            <h2>{form.title}</h2>
            <ul>
              {form.questions.map((question, questionIndex) => (
                <li key={questionIndex}>
                  {question}
                  <input
                    type="text"
                    placeholder="Your answer"
                    value={(answers[formIndex] && answers[formIndex].answers[questionIndex]) || ''}
                    onChange={(event) => handleInputChange(formIndex, questionIndex, event)}
                  />
                </li>
              ))}
              <button onClick={() => handleSubmitForm(formIndex)}>Submit</button>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;