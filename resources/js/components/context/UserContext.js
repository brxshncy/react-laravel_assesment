import Axios from 'axios';
import React,{createContext,useState,useEffect,useContext} from 'react';
import {AuthContext} from './AuthContext';
import {useHistory} from 'react-router-dom';
import { set } from 'lodash';
export const UserContext = createContext();

export const  UserContextProvider = (props) => {

    const [users,setUsers] = useState([]);
    const [specificUser,setSpecificUser] = useState([]);
    const {login_credentials} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [alertMessage,setAlertMessage] = useState({message:'',type:''});
    const [err,setErr] = useState({
        invalid:'',
        err:{},
    })
    const history = useHistory();
    
    const token =  login_credentials.data !== null ?  login_credentials.data.accessToken  : ''

    const headers = {
            'Context-Type' : 'application/json',
            'Authorization' : 'Bearer ' + (login_credentials.data !==null ? login_credentials.data.accessToken : '')
    }

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
    const getUsers = async () =>{
        const response = await  Axios.get('/api/user',{headers:headers})
        setUsers(response.data.data)
        setLoading(false)
        
    }
    const addUser = (data) => async (e) =>{
        e.preventDefault();
        // console.log(data);
         const {name,email,password,retype_password} = data; 
         if(password !== retype_password)
         {
             setErr({...err,invalid:"Password Dont Match"})
         }
         else
         {
            try
            {
                const response = await Axios.post('/api/register',{name,email,password})
                getUsers()
                history.push('/home');
            }
            catch(err)
            {
                errorHandler({err})
            }
         }

    }
    const getSpecificUser = async (id) =>{
        const response = await Axios.get(`/api/user/${id}`,{headers:headers})
        console.log(response.data)
        setSpecificUser(response.data.data)
    }
    const editUser = (data) => async (e) => {
        e.preventDefault();
        const {id,name,email,password,retype_password} = data;
        if(password != retype_password)
        {
            setErr({...err,invalid:"Password don't match."});
        }
        else
        {
            try
            {
                const response = await Axios.put(`/api/user/${id}`,{name,email,password},{headers:headers});
                console.log(response.data)
                setAlertMessage({...alertMessage,message:response.data.message, type:'update'});
                getUsers();

                history.push('/home');
            }
            catch(err)
            {
                 errorHandler({err})
            }
        }
    }
    const deleteUser = async (id) => {
        try{
            const response = await Axios.delete(`/api/user/${id}`,{headers:headers})
            setAlertMessage({...alertMessage,message:response.data.message, type:'delete'});
            getUsers();
        }catch(err)
        {

        }

    }

    const cleanAlertMssg = () =>{
        console.log("hey")
        setAlertMessage({...alertMessage,message:'',type:''})
    }

    useEffect(()=>{
        getUsers();
        setLoading(false)
    },[])


 
    useEffect(()=>{
        // console.log(users);
    },[users])

    useEffect(()=>{
    },[alertMessage])


    return(
        <UserContext.Provider value={{users,addUser,err,deleteUser,alertMessage,getSpecificUser,specificUser,editUser,cleanAlertMssg}}>
            { !loading && props.children}
        </UserContext.Provider>
    )
}