import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const handleForgotPassword = () => {
    // To Do forgot password logic here
    toast.success('Password reset link sent to your email');
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <button onClick={handleForgotPassword}>Reset Password</button>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
