import React, { useState } from 'react'
import Home from './Home'
import { Link } from 'react-router-dom'
const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true)
  const toggleForm = () => {
    setisSignInForm(!isSignInForm)
  }
  return (
    <div>
    <Home />
    <div className='absolute z-50 w-3/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    {/* <div className="absolute inset-0 bg-black/50"></div> */}
      <form className=' text-white z-50 bg-black/50 rounded-2xl pb-3 '>
        <h1 className='text-4xl font-bold translate-x-1/3 my-2 text-red-600'>
        {(isSignInForm) ? 'Sign In' : 'Sign Up'} 
        </h1>
        {!isSignInForm && (<div> 
          <input type="text" placeholder="Full Name" className='p-2 my-2 rounded bg-gray-400 w-5/6 translate-x-1/12' /> <br />
          <input type="number" placeholder="Contact Number" className='p-2 my-2 rounded bg-gray-400 w-5/6 translate-x-1/12' />
          </div> )}
        <input type="text" placeholder="Username" className='p-2 my-2 rounded bg-gray-400 w-5/6 translate-x-1/12' /> <br />
        <input type="password" placeholder="Password" className='p-2 my-2 rounded  bg-gray-400 translate-x-1/12 w-5/6' /> <br />
        <button className='p-2 my-2 w-5/6 translate-x-1/12 rounded bg-red-500 text-xl font-bold cursor-pointer' 
        onClick={(event) => {
          event.preventDefault(); 
        }}>
        {(isSignInForm) ? 'Sign In' : 'Sign Up'} 
        </button>
        <p className='my-2 mx-4'> {(isSignInForm) ? ("Don't have an account? ") : (" Already have an account? ") } 
          <button className='text-blue-600 cursor-pointer' onClick={(event) => {
          event.preventDefault(); 
          toggleForm();
        }} >{(!isSignInForm) ? 'Sign In' : 'Sign Up'} 
        </button> </p> 
      { isSignInForm && (<p className='my-2 mx-4'>Forgot your password? <button className='text-blue-600 cursor-pointer'>Reset it</button></p>)}
      </form>
      
    </div>
    </div>
    
  )
}

export default Login