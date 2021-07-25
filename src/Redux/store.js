import { createStore } from 'redux';

const initialState = {
    autoparts: null,
    singleAutopart: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOPARTS':
            {
                return {
                    ...state,
                    autoparts: action.autoparts
                }
            }
        case 'SET_SINGLE_AUTOPART':
            {
                return {
                    ...state,
                    singleAutopart: action.singleAutopart
                }
            }
        default:
            return state;
    }
}

export default createStore(reducer);