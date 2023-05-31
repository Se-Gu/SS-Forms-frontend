import React, { useState } from 'react';
import './App.css';
import Admin from './Admin.js';
import Home from './Home.js';
import User from './User.js';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [isUserAdmin] = useState(true); // use with route element later


  return (
    <BrowserRouter>
    <Routes>
        <Route
          path="/"
          element={<Home isUserAdmin={isUserAdmin}/>}
        />
        {isUserAdmin && (
        <Route
          path="/admin"
          element={<Admin />}
        />
      )}
        
        <Route
          path="/user"
          element={<User/>}
        />
        </Routes>
    </BrowserRouter>
  );
}

export default App;







