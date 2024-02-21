import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setcredentials]=useState({name:"", email:"" , password:""})
 
  
  const navigate=useNavigate()


  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {name, email, password}=credentials
    const response=await fetch('http://localhost:9000/signup',{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
       
      },
      body:JSON.stringify({name, email, password})
    })
    const json=await response.json()
    console.log(json)

    if(json.success){
      localStorage.setItem("token",json.authtoken)
      navigate('/')
      props.showAlert("Account Create Successfully","success")

    }else{
      props.showAlert("Invalid Details","danger")
    }
    
  }

  const onChange=(e)=>{
    setcredentials({...credentials, [e.target.name]:e.target.value})
  }


  return (
    <div className='container mt-3'>
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name='name' onChange={onChange} />
        </div>
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

export default Signup