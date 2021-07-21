import * as types from '../constants/contries';
const INITIAL_STATE = {
    requesting: false,
    success: false,
    error: null,
    countries: [],
};

const countries = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_COUNTRIES_REQUEST:
            return Object.assign({}, state, {
                requesting: true,
                success: false,
                error: null,
            });
        case types.GET_COUNTRIES_SUCCESS:
            return Object.assign({}, state, {
                requesting: false,
                success: true,
                error: null,
                countries: action.payload,
            });
        case types.GET_COUNTRIES_FAILURE:
            return Object.assign({}, state, {
                requesting: false,
                success: false,
                error: action.payload,
            });
        default:
            return state;
    }
};
export default countries;
