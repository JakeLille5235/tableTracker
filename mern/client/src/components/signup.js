import React, { useState } from "react";
import { useNavigate } from "react-router";


const signup = () => {

    // Creates 2 consts, form and setform which use the useState library
    const [form, setForm] = useState({
        username: "",
        password: "",
        type: ""
    });
    const navigate = useNavigate();

    // Updates the form variable as information is entered
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }
    
    // Runs when the sumbit button is clicked
    async function onSubmit(e) {
        const newSignup = { ...form };
        
        // Checks that the info is filled out
        if(newSignup.username === "" || newSignup.password === "" || newSignup.type === "" )
        {
            alert("Please enter missing information!");
            
        }
        else
        {
            let result = await fetch("http://localhost:5050/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newSignup),
            })
            .catch(error => {
                window.alert(error);
                return;
            });

            if(result.status === 200)
            {       
                setForm({username: "", password: "", type: ""});
                navigate("/login");
            }
            else
            {
                setForm({username: ""});
                alert("Username already taken.");
            }
        }
    }
    return(

        <div style={{backgroundImage: "url('https://popmenucloud.com/okpgdebt/5fd232d4-c0a6-4d17-b236-b8c9c83471e3.jpg')", height: "100vh", width:"100vw"}}>
            <h1 style={{fontFamily:"Courier New", backgroundColor:"white", textAlign:"center"}}>Signup</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group" style={{margin:"20px"}}>
                    {/* <label htmlFor="username">Username</label> */}
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={form.username}
                    onChange={(e) => updateForm({username: e.target.value})}
                    placeholder="enter username..."
                    />
                </div>
                <div className="form-group" style={{margin:"20px"}}>
                    {/* <label htmlFor="username">Username</label> */}
                    <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={form.password}
                    onChange={(e) => updateForm({password: e.target.value})}
                    placeholder="enter password..."
                    />
                </div>
                <div className="form-group" style={{margin:"20px"}}>
                    {/* <label htmlFor="username">Username</label> */}
                    <input
                    type="text"
                    className="form-control"
                    id="type"
                    value={form.type}
                    onChange={(e) => updateForm({type: e.target.value})}
                    placeholder="enter position: host / server ..."
                    />
                </div>
                <div className="form-group" style={{ textAlign: "center", margin: "20px", fontFamily:"Courier New"}}>
                    <button type="button" onClick={() => onSubmit(form)}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default signup;