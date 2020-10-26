import React from 'react';
import Navbar from '../pagelayout/Navbar';
import {Route} from 'react-router-dom';

const LandingPage = ({component:Component, exact,path,...rest}) => {

return(
    <Route
        exact={exact}
        path={path}
        {...rest}
        render ={(routeProps) => {
            return <><Navbar {...routeProps} /> <Component {...routeProps}/></>
        }}
    />
)

}

export default LandingPage;