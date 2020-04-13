import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import { SET_CURRENT } from '../../context/types';

const ContactItems = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name} {' '} 
                <span style={{ float: 'right' }} className={
                    'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')
                    }>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>

                    {/* Check if the item exit before outputing the item */}
                <ul className="list">
                    {email && (<li>
                        <i className="fa fa-envelope-open"></i> {email}
                    </li>
                    )}

                    {phone && (<li>
                        <i className="fa fa-phone"></i> {phone}
                    </li>
                    )}
                </ul>
                <p>
                    <button className="btn btn-dark btn-sm" type="submit" onClick={() => setCurrent(contact)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={onDelete} type="submit">Delete</button>
                </p>

            </h3>
        </div>
    );
};

ContactItems.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItems;