import React, { useState } from 'react';

const Home = (isUserAdmin) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            // Successful login
            const isAdmin = data.isAdmin;
            // Do something with the access token

            console.log('Login successful');
            console.log('isAdmin:', isAdmin);
            isUserAdmin= isAdmin;
            console.log('isUserAdmin:',isUserAdmin)
            if (isAdmin) {
              // Redirect to /admin page
              window.location.href = '/admin';
            } else {
              // Redirect to /user page
              window.location.href = '/user';
            }
          } else {
            // Login failed
            if (response.status === 401) {
              // Incorrect username or password
              alert('Wrong username or password');
            } else {
              // Other error
              console.error('Login failed:', data.msg);
            }
          }
        } catch (error) {
          // Error occurred
          console.error('Error:', error);
        }
      };


  return (
    <div className="container">
      <h1>Home</h1>
      <div className="login-container">
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
      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

export default Home;