import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
 
const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/login');
        }

        if(error){
            setAlert(error, 'danger');
            clearErrors();
        }

        //eslink-disable-next-line
    })

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
            setAlert('all fields required', 'danger');
        }else if(password !== password_confirmation){
            setAlert('password does not match', 'danger');
        }else{
            register({
                name, email, password
            });
        }
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
                    <input type="text" name="name" placeholder="Name" value={name} required onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Emal" value={email} required onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" minLength="6" placeholder="Password" required value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input type="password" name="password_confirmation" placeholder="Confirm Password" required value={password_confirmation} onChange={onChange} />
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