
import React from "react";
import {Route, Redirect} from "react-router"

// @ts-ignore
export const ProtectedRoute = ({ component: Component, condition, redirectUrl, ...rest }) => (
    <Route {...rest} render={(props) => (
        condition ?
            <Component {...props} /> :
            <Redirect to={redirectUrl} />
    )} />
)
