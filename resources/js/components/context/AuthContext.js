import Axios from 'axios';
import React,{createContext,useEffect,useState,useContext} from 'react';
import {useHistory,Redirect} from 'react-router-dom';


export const AuthContext = createContext();

export const AuthContextProvider = (props) =>
{
   const [err,setErr] = useState({
       invalid:'',
       err:'',
   })
   const [login_credentials,set_login_credentials] = useState({data:null});
   const [loading,setLoading] = useState(true);
   const history = useHistory();
   const errorHandler = (err) => {
        const {response} = err.err;

        if(response.status === 401)
        {
            setErr({...err, invalid:response.data})

        }
        else if(response.status === 422)
        {
            setErr({...err, err:response.data.errors})
        }
        else if(response.status === 500)
        {
            setErr({...err, invalid:"Email is already taken!"})

        }
   }
   const login = (data) => async (e) =>{
        e.preventDefault();
        const {email,password} = data;
        try
            {
                const response = await Axios.post('/api/login',{email,password})
                localStorage.setItem('login_credentials',JSON.stringify(response.data))
                loginCredentials();
                setLoading(false)
                history.push('/home');
            }
        catch(err)
            {
                errorHandler({err});
            }
   }
   const signup = (data) => async (e) =>{
        e.preventDefault();
       // console.log(data);
        const {name,email,password,retype_password} = data; 
        if(password !== retype_password)
        {
            setErr({...err,invalid:"Password Dont Match"})
        }
        else{
            try
            {
                const response = await Axios.post('/api/register',{name,email,password})
                setErr({invalid:'',err:''})
                history.push('/');
            }
            catch(err)
            {
                errorHandler({err})
            }
        }
   }
   const loginCredentials = () => {
        let credentials = JSON.parse(localStorage.getItem('login_credentials'));
        set_login_credentials({...login_credentials,data:credentials});
   }
   const handleLogout = async () => {
        const response = await Axios.get('/api/logout');
        console.log(response);
        localStorage.removeItem('login_credentials');
        history.push('/');
   }
    useEffect(()=>{
      
        
    },[err][login_credentials])

    useEffect(()=>{
      //  console.log(login_credentials);
        loginCredentials();
        setLoading(false)
    },[])


    return(
        <AuthContext.Provider value={{login,err,signup,login_credentials,handleLogout}}>
            { !loading && props.children}
        </AuthContext.Provider>
    )
}