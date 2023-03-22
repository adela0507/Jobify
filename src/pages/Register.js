import React from 'react'
import { useState,useEffect } from 'react'
import{Logo,FormRow,Alert} from '../components'
import Wrapper from '../assets/wrappers/ErrorPage'
import { useAppContext } from '../context/appContext'


const initialState={
  name:'',
  email:'',
  password:'',
  isMember:true,
}


const Register = () => {
  const[value,setValue]=useState(initialState);
  const {showAlert,isLoading,displayAlert}=useAppContext();
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
    console.log(value);
}

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
        <button type='submit' className='btn btn-block'>Submit</button>
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
