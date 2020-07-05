import * as ActionTypes from './ActionTypes';
import * as SecureStore from 'expo-secure-store';

export const fetchData = () => (dispatch) => {
    dispatch(dataLoading());
    SecureStore.getItemAsync('userinfo')
    .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if(userinfo) {
            dispatch(addData(userinfo))
        }else{
            dispatch(dispatch(dataError()));
        }
    })
    .catch((error) => console.log('Could not Save user '+error));
}
export const saveData = (data) => (dispatch) => {
    console.log("State Saveing process")
    dispatch(dataLoading());
    SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({username: data.username, password: data.password})
    )
    .then(dispatch(addData(data)))
    .catch((error) => console.log('Could not Save user '+error));
}
export const deleteData = () => (dispatch) => {
    SecureStore.deleteItemAsync('userinfo')
    .then(dispatch(removeData()))
    .catch((error) => console.log('Could not Delete user '+error));
}

export const dataLoading = () => ({
    type: ActionTypes.APP_LOADING,
    payload: true
})
export const addData = (data) => ({
    type: ActionTypes.APP_UPDATE,
    payload: data
})
export const dataError = () => ({
    type: ActionTypes.APP_ERROR,
    payload: true
})
export const removeData = () => ({
    type: ActionTypes.APP_DELETE,
    payload: true
})