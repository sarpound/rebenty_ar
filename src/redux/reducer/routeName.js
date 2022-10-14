import React from 'react';

let initialState = 'Rebenty';

const addRouteName = ( routeName ) => {
    initialState = routeName ? routeName : initialState;
    return null;
}

const getRouteName = () => {
    return initialState;
}

export default function ( state = initialState, action ) {
    switch (action.type) {
        case 'ADD_ROUTE_NAME':
            return addRouteName( action.payload.routeName );
        case 'GET_ROUTE_NAME':
            return getRouteName();
        default:
            return initialState;
    }
}