import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="" />
        <h3>ohh!page not found!</h3>
        <p>We can t seem to find the page you're looking for</p>
        <Link to='/'>
            <button>Back to home</button>
        </Link>
      </div>
    </Wrapper>
  )
}

export default Error;
