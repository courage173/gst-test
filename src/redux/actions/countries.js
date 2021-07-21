import axios from 'axios';
import * as types from '../constants/contries';
import errors from '../../utils/handleError';

export const getCountriesRequest = () => {
    return {
        type: types.GET_COUNTRIES_REQUEST,
    };
};

export const getCountriesSuccess = payload => {
    return {
        type: types.GET_COUNTRIES_SUCCESS,
        payload,
    };
};

export const getCountriesFailure = payload => {
    return {
        type: types.GET_COUNTRIES_FAILURE,
        payload,
    };
};

export const getCountries = search => {
    return async dispatch => {
        try {
            dispatch(getCountriesRequest());
            const request = await axios(
                `https://restcountries.eu/rest/v2/name/${search}`
            );
            const result = request.data;
            dispatch(getCountriesSuccess(result));
        } catch (error) {
            dispatch(getCountriesFailure(errors(error)));
        }
    };
};
