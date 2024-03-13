import React, { useState } from "react";
import Input from './Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Create Input Component With label and password it as props



export const Login = (props) => {
  const loginObject = {
    email: '',
    password: '',
  };
  
 // const [email, setEmail] = useState('');
//  const [password, setpassword] = useState('');
 
  const [login, setLogin] = useState({loginObject});
  const [isLoggedIn, setIsLoggedIn] = useState(false);




  const handleUsernameChange = (e) => {
    setLogin({...login,email:e.target.value});
  };

  const handlepasswordwordChange = (e) => {
    setLogin({...login,password:e.target.value});
  }; 

  const isSubmitDisabled = !login.email || !login.password;

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!login.email.includes('@') || !login.email.includes('.')) {
      toast.error('Invalid email');
      return;
    }

    // Password complexity check
    if (login.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:login.e, password:login.password}),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        toast.success('Login successful!');
      } else {
        setIsLoggedIn(false);
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      toast.error('Login failed');
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      {isLoggedIn ? (
        <h2>Welcome!  {login.email}</h2>
      ) : (
<>
        <form onSubmit={handleLogin}>
          
          <Input label="Username" value={login.email} onChange={handleUsernameChange} type="text" placeholder="youremail@gmail.com" />
          <Input label="passwordword" value={login.password} onChange={handlepasswordwordChange} type="passwordword" placeholder="********" />
          <div>
             <button type="submit" disabled={isSubmitDisabled}>Submit</button>  {/*create separate component*/}
          </div>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
</>

      )}
      <ToastContainer />
    </div>

  );
}