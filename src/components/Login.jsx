import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Please enter both name and email.");
    onLogin(name.trim(), email.trim());
  };

  return (
    <div className="login-container" style={loginStyle.container}>
      <form onSubmit={handleSubmit} style={loginStyle.form}>
        <h2 style={loginStyle.title}>Welcome to Your Personal Task Tracker</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={loginStyle.input}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={loginStyle.input}
        />
        <button type="submit" style={loginStyle.button}>Login</button>
      </form>
    </div>
  );
}

const loginStyle = {
  container: {
    height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)'
  },
  form: {
    padding: '2rem', borderRadius: '8px', background: 'white', boxShadow: '0 0 12px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center'
  },
  title: {
    marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem'
  },
  input: {
    marginBottom: '1rem', padding: '0.6rem', width: '100%', borderRadius: '5px', border: '1px solid var(--gray)'
  },
  button: {
    padding: '0.6rem 1.2rem', border: 'none', borderRadius: '5px', backgroundColor: 'var(--primary)', color: 'white', cursor: 'pointer', width: '100%'
  }
};
