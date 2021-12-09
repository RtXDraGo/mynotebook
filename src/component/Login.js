import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [creden,setCreden]=useState({email:"",password:""})
    let history=useHistory();
    const handle= async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:creden.email,password:creden.password })

        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            //redirect
            localStorage.setItem('token',json.jwdata)
            props.showAlert("logged successfully","success")
            history.push('/')

        }
        else{
            props.showAlert("Invalid details","danger")
        }
    }
    const onChange=(e)=>{
        setCreden({...creden,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-5">
            <form onSubmit={handle}>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={creden.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={creden.password} onChange={onChange} id="password" /> 
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
