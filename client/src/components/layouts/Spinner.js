import React, { Fragment } from 'react';
import Spinner from '../images/spinner.gif';

export default () => {
    return (
        <Fragment>
            <img
            src={Spinner} 
            style={{ 
                width: '200px',
                margin: 'auto',
                display: 'block'
            }}
            alt='spinner'
            />
        </Fragment>
    )
}
