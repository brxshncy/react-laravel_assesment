import React,{useContext,useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


const MainRoute = ({component:Component, ...rest}) =>
{
    const {login_credentials} = useContext(AuthContext);

    useEffect(()=>{
     
    },[login_credentials])
    return(
        login_credentials != null ? 
        <Route 
                {...rest}
                render={props => {
                    return login_credentials.data && login_credentials.data.accessToken ? <> <Component {...props}/> </>
                    : <Redirect to="/"/>
                }}  
        />
        :
        <Redirect to="/"/>
    )
}


export default MainRoute;