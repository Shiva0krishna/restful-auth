import React, { useState } from 'react';

function Home() {
    const [name, setName] = useState("");
    const [credits, setCredits] = useState("");
    const [id,setId]=useState(null);
    const [dept,setdept] =useState("");


    async function handleSubmit(event){
        event.preventDefault();
        const response= await fetch("http://localhost:5000/add",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(
                {
                    "id":id,
                    "name":name,
                    "credits":credits,
                    "dept":dept,
                }
            )
        })
        console.log(response);
    }
          
    return (
        <div  style={{display:"flex" ,alignItems:"center",justifyContent:"center",}}>
            <form  onSubmit={handleSubmit}>
                <label>Id:<br/>
                    <input style={{padding:"10px",fontSize:"16px"}}  placeholder='Enterid' value={id} onChange={(e)=>{setId(e.target.value)}}></input>
                </label><br/>
                <label>Name:<br/>
                    <input style={{padding:"10px",fontSize:"16px"}} type='text' placeholder='Enter Name' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                </label><br/>
                <label>dept:<br/>
                    <input style={{padding:"10px",fontSize:"16px"}} type='text' placeholder='Enter dept' value={dept} onChange={(e)=>{setdept(e.target.value)}}></input>
                </label><br/>
                <label>credits:<br/>
                    <input style={{padding:"10px",fontSize:"16px"}}  placeholder='Enter Credits' value={credits} onChange={(e)=>{setCredits(e.target.value)}}></input>
                </label><br/>
                <input style={{marginBottom:"9px",marginTop:"10px",padding:"10px", border:"2px solid lightgrey",borderRadius:"4px",}}
                type='submit' placeholder='Submit'/>
            </form >
        </div>
    );
}

export default Home;
