import '../index.css'
import react from 'react'
import {useState} from 'react'
import axios from 'axios'

const RegistrationForm=()=>{
   const[formdata, setFormdata]=useState({
    name:'',
    email:'',
    password:'',
    username:'',
    phoneNumber:'',
   })

   const handleChange=(e)=>{
    setFormdata({
        ...formdata,
        [e.target.name]:e.target.value
    })
   }

   const submit=async(e)=>{
    e.preventDefault();
    try{
        const res= await axios.post('http://localhost:4000/api/v1/users/register',formdata);
        alert('registration successfull');
        console.log(res);
    }
    catch(error){
        alert('registration unsuccessfull')
        console.log("error:",error)
    }
   
   }

    return(
        <>
       
        
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={submit} className="w-full max-w-md p-6 bg-pink-400 rounded-lg border-2">
    <h1 className="text-xl font-semibold text-center mb-4">Registration Form</h1>

    <div className="mb-4">
      <label className=" mb-1">Name:</label>
      <input name="name" value={formdata.name} onChange={handleChange} type="text"
             className="w-full px-2 py-1 rounded border" placeholder="name"/>
    </div>

    <div className="mb-4">
      <label className=" mb-1">Username:</label>
      <input name="username" value={formdata.username} onChange={handleChange} type="text"
             className="w-full px-2 py-1 rounded border" placeholder="Username"/>
    </div>

    <div className="mb-4">
      <label className=" mb-1">Email:</label>
      <input name="email" value={formdata.email} onChange={handleChange} type="email"
             className="w-full px-2 py-1 rounded border" placeholder="email"/>
    </div>

    <div className="mb-4">
      <label className=" mb-1">Phone Number:</label>
      <input name="phoneNumber" value={formdata.phoneNumber} onChange={handleChange} type="number"
             className="w-full px-2 py-1 rounded border" placeholder="phonenumber"/>
    </div>

    <div className="mb-4">
      <label className=" mb-1">Password:</label>
      <input name="password" value={formdata.password} onChange={handleChange} type="password"
             className="w-full px-2 py-1 rounded border" placeholder="password"/>
    </div>

    <div className="flex justify-center">
      <button type="submit" className="bg-white text-pink-500 px-4 mr-4 py-1 rounded border hover:bg-pink-100">Submit</button>
      <button type="button" className="bg-white text-pink-500 px-4 ml-5 py-1 rounded border hover:bg-pink-100">Login</button>
    </div>
    
  </form>
</div>

        </>
    );
   
}

export default RegistrationForm;