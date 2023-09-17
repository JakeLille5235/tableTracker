import React, { useState } from "react";
import { useNavigate } from "react-router";

const login = () => {

    // Creates 2 consts, form and setform which use the useState library
    const [form, setForm] = useState({
        username: "",
        password: "",
        type: "" // type of user: either host or server (only differing permissions will be host set init table value, server clear list end of night / free program)
    });
    const navigate = useNavigate();

    // Updates the form variable as information is entered
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value }; //... operator 'concantenates' string from previous
        });
    }
    
    // Runs when the sumbit button is clicked
    async function onSubmit(e) {
        const newLogin = { ...form }; //... take all elements of form, copy to newLogin (username: password:)

        let status = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newLogin),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        
        if(status.status === 500)
        {
            alert("Incorrect Username or Password");
        }
        else if (status.status === 200)
        {            
            setForm({username: "", password: ""});
            navigate("/home");
            localStorage.setItem("token", "VALID-TOKEN") // place-holder token to tackle authentication at later time
        }   
    }

    return (
        <div style={{backgroundImage: "url('https://popmenucloud.com/okpgdebt/5fd232d4-c0a6-4d17-b236-b8c9c83471e3.jpg')", height: "100vh", width:"100vw"}}>
            <h1 style={{fontFamily:"Courier New", backgroundColor:"white", textAlign:"center"}}>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group" style={{margin:"20px"}}>
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={form.username}
                    placeholder="username..."
                    onChange={(e) => updateForm({username: e.target.value})}
                    />
                </div>
                <div className="form-group" style={{margin:"20px"}}>
                    <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={form.password}
                    placeholder="password..."
                    onChange={(e) => updateForm({password: e.target.value})}
                    />
                </div>
                <div className="form-group" style={{ textAlign: "center", margin: "20px", fontFamily:"Courier New"}}>
                    <button type="button" onClick={() => onSubmit(form)}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default login;