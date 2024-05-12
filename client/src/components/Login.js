import React from 'react'
import { useState} from 'react'
import Axios from 'axios';
// import {useNavigate }from 'react-router-dom'

Axios.defaults.withCredentials=true;

function Login() {
    const [uname,setuname] =useState("");
    const [pass,setpass] =useState("");
    const [stat,setstat] =useState(" ")
    // const navigate = useNavigate();
    async function handleSubmit(event){
        event.preventDefault();
        const resp=fetch('http://localhost:5000/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "uname":uname,
                "pass":pass,
            })
        })
        if((await resp).ok){
            const data =(await resp).json();
            setstat( `Logged in as ${data.name}`);
            console.log(data);
        }else{
            setstat("Try again")
        }
        
    }
    function getrequest(event){
        event.preventDefault();
        fetch("http://localhost:5000/login",{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
       })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response.json())
            return response.json();

        })
        .then(data => {
            console.log(data);
       })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }



  return (
    <div style={{display:"flex",height:"63vh",background:"dodgerblue",justifyContent:"center",alignItems:"center",padding:"10%",flexDirection:"column"}}>
        <h1>Enter your credentials</h1>
        <form onSubmit={handleSubmit}>
            <lable style={{color:"white"}}>UserName :<br/>
            <input style={{padding:"10px",fontSize:"16px",marginTop:"5px"}} value={uname} onChange={(e)=>{setuname(e.target.value)}} placeholder='Username'  required></input>
            </lable>
            <br/> 
    
       <    lable style={{color:"white"}}>Password :<br/>
                <input style={{padding:"10px",fontSize:"16px",marginTop:"5px"}}value={pass} onChange={(e)=>setpass(e.target.value)} placeholder='Password'  required></input>
            </lable> <br/>
            <input style={{marginBottom:"9px",marginTop:"10px",padding:"10px 85px ", border:"2px solid lightgrey",borderRadius:"4px",}}
            type='submit' placeholder='Login'/>
        </form>

        <form on onSubmit={getrequest}>
            <input style={{marginBottom:"9px",marginTop:"10px",padding:"10px 85px ", border:"2px solid lightgrey",borderRadius:"4px",}}
            type='submit' placeholder='Get request'/>
        </form>
        

        <h3>Dont have an account?</h3>
        <a href='/register' style={{fontSize:"16px" ,textDecoration:"none",color:"whitesmoke",lineHeight:"20px",fontWeight:'400'}}>register</a>
        <br/>
        <h2  value={stat} style={{color:"limegreen"}}>{stat}</h2>

    </div>
  )
}

export default Login
