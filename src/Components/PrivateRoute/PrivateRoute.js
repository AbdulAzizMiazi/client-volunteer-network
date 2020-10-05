import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const [userState] = useContext(UserContext);
    return (
        <Route
        {...rest}
        render={({ location }) =>
            userState.isAuthorizedUser ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
};

export default PrivateRoute;