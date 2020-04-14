import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext';
 
const Register = () => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    
    const {name, email, password, password_confirmation } = user;
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            setAlert('All fields are required', 'danger')
        }
        console.log(name);
    }

    return (
        <div className="grid-2">
            <div>
                <img src={require('../images/register1.png')} alt="" className="img-fluid"/>
            </div>

            <div className="form-container">
            <h1>Account <span className="text-teal"> Register</span></h1>
                <hr/>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Emal" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" minLength="6" placeholder="Password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input type="password" name="password_confirmation" placeholder="Confirm Password" value={password_confirmation} onChange={onChange} />
                </div>
                <div>
                    <input type="submit" className="btn btn-teal" value="Submit"/>
                    <Link to='/login' className="btn btn-light">Already have an account? Login</Link>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Register;