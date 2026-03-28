import { Link } from "react-router-dom"
import "./Login.css"
import { useState } from "react"
import api from "../api/api";

const Login = () => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");

        try {

            const res = await api.post("/login", { username, password });

            console.log(res);

            if (res.status === 200) {

                alert("login successful")
                localStorage.setItem("token", res.data);
            }
        } catch (error) {
            alert("Invalid username or password")
            console.log(error.response.data);
        }
    }

    return (
        <div className="login-container">

            <div className="login-cart">
                <h2>Welcome back</h2>        {/* add this */}
                <p className="login-sub">Sign in to your account</p>  {/* add this */}

                <form action="" className="login-form" onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="">Email</label>
                        <input type='username' placeholder="email" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">password</label>
                        <input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' disabled={loading} >Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">register</Link></p>
            </div>
        </div >

    )
}
export default Login
