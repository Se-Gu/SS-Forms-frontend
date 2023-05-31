import React, { useState } from 'react';

const User = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [texts, setTexts] = useState([]);

        const handleRegister = async () => {
            try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
        
            const data = await response.json();
        
            if (response.ok) {
                // User created successfully
                console.log(data.msg);
            } else {
                // Username already exists or other error
                console.error(data.msg);
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };

        const handleCreateText = async () => { //needs to be fixed
            try {
              const accessToken = '38dd56f56d405e02ec0ba4be4607eaab'; // Replace with the actual JWT access token
        
              const response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ text: 'Lorem ipsum dolor sit amet' }), // Replace with the actual text data
              });
        
              const data = await response.json();
        
              if (response.ok) {
                // Text created successfully
                alert("successfull");
                console.log(data.msg);
              } else {
                // Text already exists or other error
                console.error(data.msg);
              }
            } catch (error) {
              // Error occurred
              console.error('Error:', error);
            }
          };
          const fetchTexts = async () => { //needs to be fixed
            try {
              const accessToken = '38dd56f56d405e02ec0ba4be4607eaab';
              const response = await fetch('http://localhost:5000/get', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                }
              });
        
              if (response.ok) {
                const data = await response.json();
                setTexts(data.docs);
              } else {
                // Handle error response
                console.error('Request failed with status:', response.status);
              }
            } catch (error) {
              // Handle network error
              console.error('Request failed:', error);
            }
          };
  return (
    <div className="container">
      <h1>User Panel</h1>
      <div className="container">
      <div className="form-container" >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      </div>
    </div>
    <div className="create-text-container">
      <button onClick={handleCreateText}>Create Text</button>
    </div>
    <div className="get-texts-container">
      <button onClick={fetchTexts}>Get Texts</button>

      {/* Display the fetched texts */}
      {texts.map((text, index) => (
        <div key={index}>{text}</div>
      ))}
    </div>
    </div>
  );
};

export default User;