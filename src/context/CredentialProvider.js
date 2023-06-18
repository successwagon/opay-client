import { createContext, useState } from "react";

const CredentialContext = createContext({});

export const CredentialProvider = ({ children }) => {
    const [load, setLoad] = useState(false);
    return (
        <CredentialContext.Provider value={{ load, setLoad }}>
            {children}
        </CredentialContext.Provider>
    )
}

export default CredentialContext;