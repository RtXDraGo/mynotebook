import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
const Signup = (props) => {
    const [creden,setCreden]=useState({name:"",email:"",password:"",cpassword:""})
    let history=useHistory();
    const handle= async (e)=>{
        e.preventDefault()
        const {name,email,password}=creden;
        const response = await fetch("http://localhost:8000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})

        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            //redirect
            localStorage.setItem('token',json.jwdata)
            history.push('/')
            props.showAlert("Acount created successfully","success")

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
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label for="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cpassword"id="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
