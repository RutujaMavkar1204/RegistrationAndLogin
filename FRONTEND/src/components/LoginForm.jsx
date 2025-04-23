import {useState} from 'react'
import axios from 'axios'

const LoginForm=()=>{
    const [form, setform]=useState({
       usernameORemail:"",
       password:"" 
    })
    const handleChange=(e)=>{
        setform({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const submit=async(e)=>{
        e.preventDefault();
        try{
            const body = {
                password: form.password,
                
              };
        
              if (form.usernameORemail.includes('@')) {
                body.email = form.usernameORemail;
              } else {
                body.username = form.usernameORemail;
              }
        
            const res=await axios.post('http://localhost:4000/api/v1/users/login',body);
            alert("Logged in SuccessFully");
            console.log(res);

        }
        catch(error){
            alert("user is not logged in, try again !!!!!!!!!!!!")
            console.log('error:',error);
        }
    }
    return(
        <form onSubmit={submit}>
            <div>
                <label>Username or Email</label>
                <input name="usernameORemail" value={form.usernameORemail} onChange={handleChange} type="text" className="" placeholder="Username or Email"  />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="" placeholder="Password"  />
            </div>
            <div>
                <button type="submit" className="" >Submit</button>
            </div>
        </form>
    )
}
export default LoginForm;