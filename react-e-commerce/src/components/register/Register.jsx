import { Link } from "react-router-dom";
import "./Register.css";
import { useEffect, useState } from "react";
import api from "../api/api";

const Register = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  
  const callRegisterApi = (e)=>{
    e.preventDefault();
    const response = api.post("/register",{username,password});
    response.then(res=>{ 
      alert(res.data);
      console.log(res.data);
  })
  .catch((error)=> console.log(error));
    

  }



  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>

        <form className="register-form" onSubmit={callRegisterApi}>

          <div className="form-group">
            <label>Email</label>
            <input type='name' onChange={(e)=> setUsername(e.target.value)} placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)} />
          </div>

          <button className="register-btn">
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <Link to="/login" className="login-link"> Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;