import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin, loginError }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className='form'>
      <h2>Login to your account!</h2>
      <div>
        <input
          className='form__field'
          type="text"
          value={username}
          placeholder='Username'
          required
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <input
          className='form__field'
          type="password"
          value={password}
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='form__button'
        onClick={() => onLogin(username, password)}
      >
        Login
      </button>
      {loginError &&
        <p className='loginError'>Invalid username or password!</p>
      }
    </form>
  );
}

export default LoginForm;
