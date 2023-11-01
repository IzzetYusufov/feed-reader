import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';

export function LoginPage() {
  const [users, setUsers] = useState([]);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogin = (username, password) => {
    const user = users
      .find((user) => user.username === username && user.email === password);
    if (user) {
      console.log('Login successful');
      navigate('/feeds');
    }
    else {
      setLoginError(true);
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} loginError={loginError}/>
    </div>
  );
}
