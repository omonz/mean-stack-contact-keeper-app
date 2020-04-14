//dispatch to reducer
import React, { useReducer } from 'react';
import {v4 as uuid} from "uuid"; 
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id:1,
                name: 'Jill Johnson',
                email: 'jiljohnson@gmail.com',
                phone: '111-222-33-44',
                type: 'personal'
            },
            {
                id:2,
                name: 'James Mark',
                email: 'jamesmark@gmail.com',
                phone: '44-222-99-44',
                type: 'personal'
            },
            {
                id:3,
                name: 'Grill Larry', 
                email: 'grilllary@gmail.com',
                phone: '93-453-093-848',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch]  = useReducer(ContactReducer, initialState);

    //Add Contact
    const addContact = contact =>{
        contact.id = uuid;
        dispatch({type: ADD_CONTACT, payload: contact});
    }

    //Delete Contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload:id });
    }

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload:contact });
    }

    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
    }
    //Update Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    //Filter Contact
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    }

    //Clear Contact
    const clearFiltered = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFiltered
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;

