import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    
    const { email, password } = user;
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="grid-2">
            <div>
                <img src={require('../images/login1.png')} alt="login" className="img-fluid"/>
            </div>

            <div className="form-container">
            <h1>Account <span className="text-teal"> Login</span></h1>
                <hr/>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Emal" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-teal" value="login"/>
                <Link to='/register' className="btn btn-light">Don't have account? Register</Link>
            </form>
        </div>
        </div>
    )
}

export default Login;