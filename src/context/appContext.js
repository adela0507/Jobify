import React,{useReducer,useContext} from 'react';
import reducer from'./reducers'
import axios from 'axios'

import { DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS, 
    TOGGLE_SIDEBAR,
    LOGOUT_USER, 
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_ERROR,
    CREATE_JOB_SUCCESS,
    GET_JOB_BEGIN,
    GET_JOB_SUCCESS,

 } from './actions';
import { useEffect } from 'react';

const token=localStorage.getItem('token')
const user=localStorage.getItem('user')
const userLocation=localStorage.getItem('location')

const initialState={
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user:user? JSON.parse(user):null,
    token:token,
    userLocation: userLocation || '',
    isEditing:false,
    editJobId:'',
    position:'',
    company:'',
    jobLocation:userLocation || '',
    jobTypeOptions:['full-time','part-time','remote','internship'],
    jobType:'internship',
    statusOptions:['ínterview','declined','pending'],
    status:'pending',
    showSidebar:false,
    jobs:[],
    totalJobs:0,
    numOfPages:1,
    page:1,
}


const AppContext= React.createContext();


const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState);
//axios
//axios.defaults.headers['Authorization']=`Bearer ${state.token}` global setup
const authFetch=axios.create({
    baseURL:'/api/v1',
})
//request
authFetch.interceptors.request.use((config)=>{
     config.headers['Authorization']=`Bearer ${state.token}`
    return config;
},

(error)=>{
    return Promise.reject(error)
})
//response
authFetch.interceptors.response.use((response)=>{
    
    return response;
},

(error)=>{
    if(error.response.status===401){
        logoutUser()
        }
    return Promise.reject(error)
})

    const displayAlert=()=>{
    dispatch({type:DISPLAY_ALERT})
    clearAlert()
}

const clearAlert=()=>{
setTimeout(()=>{
dispatch({type:CLEAR_ALERT})
},3000)
}

const addUserToLocalStorage=({user,token,location})=>{
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('location',JSON.stringify(location))
}

const removeUserFromLocalStorage=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
}

const registerUser=async(currentUser)=>{
    dispatch({type:REGISTER_USER_BEGIN})
    try {
        const response=await axios.post('/api/v1/auth/register',
        currentUser)
        console.log(response);
        const{user,token,location}=response.data
        dispatch({type:REGISTER_USER_SUCCESS,
        payload:{user,token,location}
    })
addUserToLocalStorage({user,token,location})
    } catch (error) {
        console.log(error.response);
        dispatch({type:REGISTER_USER_ERROR, 
            payload:{msg:error.response.data.msg}})
    }
    clearAlert()
}
const loginUser=async(currentUser)=>{
    dispatch({type:LOGIN_USER_BEGIN})
    try {
        const {data}=await axios.post('/api/v1/auth/login',
        currentUser)
       // console.log(response);
        const{user,token,location}=data
        dispatch({type:LOGIN_USER_SUCCESS,
        payload:{user,token,location}
    })
addUserToLocalStorage({user,token,location})
    } catch (error) {
        console.log(error.response);
        dispatch({type:LOGIN_USER_ERROR, 
            payload:{msg:error.response.data.msg}})
    }
    clearAlert()
}
const toggleSidebar=()=>{
    dispatch({type:TOGGLE_SIDEBAR})
}
const logoutUser=()=>{
dispatch({type:LOGOUT_USER})
removeUserFromLocalStorage()
}
const updateUser=async(currentUser)=>{
    dispatch({type:UPDATE_USER_BEGIN})
    try {
        const {data}=await authFetch.patch('/auth/updateUser',currentUser,)

        const{user,location,token}=data
         dispatch({type:UPDATE_USER_SUCCESS,
        payload:{user,token,location}
    })
    addUserToLocalStorage({user,token,location})
    } catch (error) {
        if(error.response.status !==401){
 dispatch({type:UPDATE_USER_ERROR, 
            payload:{msg:error.response.data.msg}})
        }
    }
    clearAlert()
}

const handleChange=({name,value})=>{
    dispatch({type:HANDLE_CHANGE,payload:{name,value}})
}
const clearValues=()=>{
    dispatch({type:CLEAR_VALUES})
}
const createJob=async ()=>{
    dispatch({type:CREATE_JOB_BEGIN})
    try {
        const {position,company,jobLocation,status}=state
        await authFetch.post('/jobs',{
            position,
            company,
            jobLocation,
            status,
        })
        dispatch({type:CREATE_JOB_SUCCESS})
        dispatch({type:CLEAR_VALUES})
    } catch (error) {
        if(error.response.status){
            dispatch({type:CREATE_JOB_ERROR,
                payload:{msg:error.response.data.msg},})
        }
    }
    clearAlert()
}
const getJobs=async ()=>{
    let url=`/jobs`

    dispatch({type:GET_JOB_BEGIN})
    try {
        const {data}=await authFetch(url);
        const{jobs,totalJobs,numOfPages}=data
        dispatch({type:GET_JOB_SUCCESS,
            payload:{
                jobs,
                totalJobs,
                numOfPages,
            },
            })
    } catch (error) {
        console.log(error.response);
        logoutUser()
    }

    clearAlert()
}


    return(
<AppContext.Provider 
value={{...state,
    clearValues,
    createJob,
    updateUser, 
    handleChange,
    logoutUser, 
    displayAlert,
    registerUser,
    toggleSidebar,
    loginUser,
    getJobs,
    }}>
    {children}
</AppContext.Provider>
    );
}
const useAppContext=()=>{
    return useContext(AppContext);
}
export {AppProvider,initialState,useAppContext};