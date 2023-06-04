import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    let initialState = {};
    const authToken = sessionStorage.getItem('authToken');
    if(authToken){
        const decodedToken = jwt_decode(authToken);
        initialState = {
            user: Object.values(decodedToken)[2],
            username: Object.values(decodedToken)[1],
            role: Object.values(decodedToken)[4],
            authToken
        }
    }
    
    const [auth, setAuth] = useState(initialState);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;