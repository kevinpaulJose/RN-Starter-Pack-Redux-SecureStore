import * as ActionTypes from './ActionTypes';

export const data = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch(action.type) {
        case ActionTypes.APP_LOADING:
            return {...state, isLoading: true, errMess: null, data: []}
        case ActionTypes.APP_UPDATE:
            return {...state, isLoading: false, errMess: null, data: action.payload};
        case ActionTypes.APP_ERROR:
            return {...state, isLoading: false, errMess: "No Data Found", data: []};
        case ActionTypes.APP_DELETE:
            return {...state, isLoading: false, errMess: "No Data Found", data: []};
        default:
            return state;
    }
}