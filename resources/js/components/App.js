import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch} from 'react-router-dom';
import Home from './pagelayout/Home';
import Login from './pagelayout/Login';
import Signup from './pagelayout/Signup';
import {AuthContextProvider} from './context/AuthContext';
import LandingPage from './route/LandingPage';
import MainRoute from './route/MainRoute'
import {UserContextProvider} from './context/UserContext';
import AddUser from './pagelayout/AddUser'
import EditUser from './pagelayout/EditUser'

const App = () => {
    return(
        <>
            <Router>
                <Switch>
                    <AuthContextProvider>
                        <LandingPage path="/" exact component={Login}/>
                        <LandingPage path="/signup" exact component={Signup}/>
                        <UserContextProvider>
                            <MainRoute path="/home" component={Home} />
                            <MainRoute path="/create/user" component={AddUser}/>
                            <MainRoute path="/update/user/:id" component={EditUser}/>
                        </UserContextProvider>
                    </AuthContextProvider>
                </Switch>
            </Router>
        </>
    )
}

export default App;
ReactDOM.render(<App/>,document.getElementById('app'));