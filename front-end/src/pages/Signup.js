import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import '../styles/Signup.css';

export default function Signup() {
  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    password: '',
  });
  const { signup } = useContext(AuthContext);
  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formValues.email;
    const password = formValues.password;
    const username = formValues.username;
    if (username.trim() && password.trim() && email.trim()) {
      signup(email, username, password);
      toast.success('Account created successfully');
      setFormValues({ email: '', username: '', password: '' });
    }
  };

  return (
    <main className='signup'>
      <form className='signup__form' onSubmit={handleSubmit}>
        <h2 className='signup__title'>Create an account</h2>
        <label htmlFor='email'>Email Address</label>
        <input
          id='email'
          name='email'
          type='email'
          required
          value={formValues.email}
          onChange={handleInputChange}
          autoComplete="email"
        />
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          name='username'
          required
          type='text'
          value={formValues.username}
          onChange={handleInputChange}
          autoComplete="username"
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          required
          value={formValues.password}
          onChange={handleInputChange}
        />
        <button className='signupButton'>REGISTER</button>
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          Already have an account?{" "}
          <Link className='link' to='/login'>
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
};