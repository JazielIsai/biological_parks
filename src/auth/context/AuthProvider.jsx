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

    const login = ( id, email, firstname = '', lastname = '', academicTitle = '', id_rol, Rol ) => {
        const user = {
            id: id,
            email: email,
            firstname: firstname,
            lastname,
            academicTitle,
            id_rol,
            Rol
        }
        
        console.log("The user is: ", user);

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