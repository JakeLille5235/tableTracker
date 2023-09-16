import React, { useState } from "react";
import { useNavigate } from "react-router";


const signup = () => {

    // Creates 2 consts, form and setform which use the useState library
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
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
        if(newSignup.firstname === "" || newSignup.lastname === ""  || newSignup.username === "" || newSignup.password === "" )
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
                setForm({username: "", firstname: "", lastname: "", password: ""});
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
        <div>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    value={form.firstname}
                    onChange={(e) => updateForm({firstname: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={form.lastname}
                    onChange={(e) => updateForm({lastname: e.target.value})}
                    />
                </div>
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
}

export default signup;