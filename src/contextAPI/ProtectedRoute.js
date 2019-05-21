import React from "react"
import { Redirect } from "react-router-dom";
import { AppContext } from './ContextProvider';

function ProtectedRoute(props) {
    const { component: Component, ...rest } = props;
    return (
        <AppContext.Consumer>
            {(context) => {
                const { token } = context
                return token ? (<Component {...rest} context={context}/>) : (<Redirect to="/login" />)
            }}
            
        </AppContext.Consumer>   
    )
}

export default ProtectedRoute;