import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setcredentials]=useState({ email:"" , password:""})
 
  
  const navigate=useNavigate()


  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {name, email, password}=credentials
    const response=await fetch('https://saving-note-inotebook.onrender.com/login',{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
       
      },
      body:JSON.stringify({name, email, password})
    })
    const json=await response.json()
   

    if(json.success){
      localStorage.setItem("token",json.authtoken)
      props.showAlert("Logged In  Successfully", "success")
      navigate('/')

    }
    else{
      props.showAlert("Invalid credentials", "danger")

    }
    
  }

  const onChange=(e)=>{
    setcredentials({...credentials, [e.target.name]:e.target.value})
  }


  return (
    <div className='container mt-3'>
       <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={4} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login