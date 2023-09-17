import React, { useState } from 'react';

import { Navigate } from "react-router-dom";
//import { useNavigate } from "react-router";



const home = () => {

    if(localStorage.getItem("token") == null){
        return <Navigate to="/login" replace />;
    }
       
    return(
      
        <h1>Habits</h1>

        
    );
}

export default home;