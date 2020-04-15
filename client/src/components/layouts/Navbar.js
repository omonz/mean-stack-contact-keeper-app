import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

import ContactContext from '../../context/contact/contactContext';

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user} = authContext;

    const { clearContacts } = contactContext;

    const onLogout = () => {
        // e.preventDefault();
        logout();
        clearContacts();
    }

    const authLink = (
        <Fragment>
            <li> 
                Hello {user && user.name } 
            </li>
            <li>
                <a onClick={onLogout} href="#">
                    <i className="fas fa-sign-out-alt"/> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
        </Fragment>
    )

    return (
        <div className="navbar bg-teal">
            <h2>
                <i className={icon}/> {title}
            </h2>
            <ul>
               {isAuthenticated ? authLink : guestLink }
            </ul>
        </div>
    )    
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper App',
    icon: 'fa fa-id-card alt'
}

export default Navbar
