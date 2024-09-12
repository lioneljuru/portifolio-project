import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  function handleLogin(event) {
    event.preventDefault();
    const email = formValues.email;
    const password = formValues.password;

    if (email.trim() && password.trim()) {
      const success = login(email, password);

      if (!success) {
        toast.error("Invalid email or password");
        setFormValues({ email: '', password: '' });
      } else {
        toast.success('Login Successful');
      }

    }
  }

  return (
    <main className='login'>
      <form className="login__form" onSubmit={handleLogin}>
        <h2 className="login__title">Log into your account</h2>
        <label htmlFor="email">Email</label>
        <input
          id='email'
          name='email'
          type='text'
          autoComplete="email"
          value={formValues.email}
          onChange={(handleInputChange)}
          className="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id='password'
          type='password'
          name='password'
          value={formValues.password}
          onChange={(handleInputChange)}
          className="password"
        />

        <button>LOG IN</button>
        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          Don't have an account?{' '}
          <Link className="Link" to='/register'>
            Create one
          </Link>
        </p>
      </form>
    </main>
  )
}