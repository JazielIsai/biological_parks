import { useReducer } from 'react';
import { types } from '../Types/types';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

const initialState = {
    logged: false,
}

const init = () => {
    const user = 'user';

    return {
        logged: false,//!!user,
        user: user
    }
}

export const AuthProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, initialState, init);

    const login = ( name = 'john', password = '123' ) => {
        const user = {
            id: 'ABC',
            name: name,
            password: password
        }

        const action = {
            type: types.login,
            payload: user
        }

        dispatch(action);
    }

    const logout = () => {
        dispatch({
            type: types.logout
        });
    }

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}