import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import{Logo,FormRow,Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'


const initialState={
  name:'',
  email:'',
  password:'',
  isMember:false,
}


const Register = () => {
  const[value,setValue]=useState(initialState);
  const navigate=useNavigate();
  const {user,showAlert,isLoading,displayAlert,registerUser,loginUser}=useAppContext();
  const toggleMember=()=>{
    setValue({...value, isMember: !value.isMember})
  }

  const handleChange=(e)=>{
    setValue({...value, [e.target.name]: e.target.value})
    console.log(e.target);
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    const{email,name,password,isMember}=value;
    if(!email || !password || (!isMember && !name)){
    displayAlert()
    return
    }
    const currentUser={email,name,password}
    if(isMember){
      loginUser(currentUser);
    }
    else{
     registerUser(currentUser);
    }
    console.log(value);
}
useEffect(()=>{
if(user){
  setTimeout(()=>{
  navigate('/')
  },30000)
}
},[user,navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo/>
        <h3>{value.isMember ? 'Login':'Register'}</h3>
        {showAlert &&<Alert/>}
        {!value.isMember &&
        <FormRow 
        type="text" 
        name="name" 
        value={value.name} 
        handleChange={handleChange}/>
        }
        
        <FormRow 
        type="email" 
        name="email" 
        value={value.email} 
        handleChange={handleChange}/>
        
        <FormRow type="password" 
        name="password" 
        value={value.password} 
        handleChange={handleChange}/> <br />
        <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
        <br />
        {value.isMember?'Not a member yet?':'Already a member?'} <br />
        <button type='button' onClick={toggleMember} className='member-btn'>
        {value.isMember?'Register':'Login'}
        </button>  
        <br />
      </form>
    </Wrapper>
  )
}

export default Register
