//dispatch to reducer
import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACT,
    CLEAR_CONTACT
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch]  = useReducer(ContactReducer, initialState);
    
    //Get all user contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }   
    }

    //Add Contact
    const addContact = async contact =>{
        const config = {
            headers : {
                'Content-type' : 'application/json'
            } 
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: res.data});
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }        
    }

    //Delete Contact
    const deleteContact = async _id => {
        try {
            await axios.delete(`/api/contacts/${_id}`);
            dispatch({type: DELETE_CONTACT, payload: _id });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    }

     //Update Contact
     const updateContact = async contact => {
         const config = {
             headers : {
                 'Content-type' : 'application/json'
             }
         }

         try {
             const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data })
         } catch (err) {
             dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
         }
    }

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload:contact });
    }

    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
    }

    //Clear Contact
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACT });
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
                error: state.error, 
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFiltered,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;

