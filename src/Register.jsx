import React, { useState } from "react";
import Input from "./Input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = (props) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
      const isSubmitDisabled = !email || !password || !name;
    
      const handleRegister = async (e) => {
        e.preventDefault();
    
        // Basic email validation
        if (!email.includes('@') || !email.includes('.')) {
          toast.error('Invalid email');
          return;
        }
    
        // Password complexity check
        if (password.length < 8) {
          toast.error('Password must be at least 8 characters long');
          return;
        }
    
        try {
          const response = await fetch('https://dummyjson.com/docs/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
    
          if (response.ok) {
            toast.success('Registration successful!');
            props.onFormSwitch('login');
          } else {
            toast.error('Registration failed');
          }
        } catch (error) {
          console.error('Error occurred during registration:', error);
          toast.error('Registration failed');
        }
      };
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegister}>
            <label htmlFor="name">Full name</label>
            <Input value={name} name="name" onChange={handleNameChange} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <Input value={email} onChange={handleEmailChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <Input value={password} onChange={handlePasswordChange} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" disabled={isSubmitDisabled}>Register</button>
        </form>

        
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        <ToastContainer />
    </div>
    )
}