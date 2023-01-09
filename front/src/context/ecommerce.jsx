import React from "react";

export const EcommerceContext = React.createContext()
export const EcommerceContextProvider = ({ children }) => {
    const [token, setToken] = React.useState(null);
    return (
        <EcommerceContext.Provider value={{ token, setToken }}>
            {children}
        </EcommerceContext.Provider>
    )
}