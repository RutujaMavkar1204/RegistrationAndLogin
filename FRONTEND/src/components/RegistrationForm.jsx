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
        <h1>Registration Form</h1>
        
        <form onSubmit={submit}>
        <div className="form" >
            <label>Name:</label>
            <input name="name" value={formdata.name} onChange={handleChange} type="text" className="name" placeholder="name"/>
            <label>Username</label>
            <input name="username" value={formdata.username} onChange={handleChange} type="text" className="Username" placeholder="Username" />
            <label>Email:</label>
            <input name="email" value={formdata.email} onChange={handleChange} type="email" className="email" placeholder="email"/>
            <label>Phone Number:</label>
            <input name="phoneNumber" value={formdata.phoneNumber} onChange={handleChange} type="number"className="phonenumber" placeholder="phonenumber"/>
            <label>Password:</label>
            <input name="password" value={formdata.password} onChange={handleChange} type="password"className="password" placeholder="password"/>
            <button type="submit" >Submit</button>
            </div>
        </form>
        </>
    );
   
}

export default RegistrationForm;