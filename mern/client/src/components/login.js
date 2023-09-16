import React, { useState } from "react";
import { useNavigate } from "react-router";

const login = () => {

    // Creates 2 consts, form and setform which use the useState library
    const [form, setForm] = useState({
        username: "",
        password: "",
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
        }   
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={form.username}
                    onChange={(e) => updateForm({username: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={form.password}
                    onChange={(e) => updateForm({password: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <button type="button" onClick={() => onSubmit(form)}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default login;