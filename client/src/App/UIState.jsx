import React, { useReducer } from 'react';

const ACTIONS = {
    EDIT_MODE = 'edit'
}

function reducer(state, action) {
    switch (action.type) {
        case '':
            return {}
        default:
            return state
    }
}

export default function UIStateProvider() {
    const [state, dispatch] = useReducer(reducer, {})
}

export { ACTIONS }