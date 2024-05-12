import React from 'react'
import { useState } from 'react';

function Register() {
    const [runame,setruname] =useState("");
    const [rpass,setrpass] =useState("");
    async function handleSubmit(event){
        event.preventDefault();
        const resp=fetch('http://localhost:5000/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "runame":runame,
                "rpass":rpass,
            })
        })
        console.log(resp);
    }
  return (
    <div style={{display:"flex",height:"63vh",background:"dodgerblue",justifyContent:"center",alignItems:"center",padding:"10%",flexDirection:"column"}}>
        <h1>Register  by entering details</h1>
        <form onSubmit={handleSubmit}>
            <lable style={{color:"white"}}>UserName :<br/>
            <input style={{padding:"10px",fontSize:"16px",marginTop:"5px"}} value={runame} onChange={(e)=>{setruname(e.target.value)}} placeholder='Username'  required></input>
            </lable>
            <br/> 
    
       <    lable style={{color:"white"}}>Password :<br/>
                <input style={{padding:"10px",fontSize:"16px",marginTop:"5px"}}value={rpass} onChange={(e)=>setrpass(e.target.value)} placeholder='Password'  required></input>
            </lable> <br/>
            <input style={{marginBottom:"9px",marginTop:"10px",padding:"10px 85px ", border:"2px solid lightgrey",borderRadius:"4px",}}
            type='submit' placeholder='Register'/>
        </form>
        <h3>Already have an account/</h3>
        <a href='/login' style={{fontSize:"16px" ,textDecoration:"none",color:"whitesmoke",lineHeight:"20px",fontWeight:'400'}}>Login</a>

    </div>
  )
}

export default Register;
