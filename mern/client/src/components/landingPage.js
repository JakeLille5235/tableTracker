import React from "react";
//import { useNavigate } from "react-router";

const landingPage = () => {

    return(
        
        <div className="container">
            <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap');
          .custom-font {
            font-family: 'Libre Baskerville', serif;
          }
          .custom-text-color {
            color: #163566; /* Replace with your desired color value */
        }
        `}
      </style>
        <div className="alert alert-danger" role="alert">
          <h3 class="d-flex justify-content-center"><strong>Under Development...</strong></h3></div>
        <h1 class="d-flex justify-content-center bg-info p-2 rounded custom-font custom-text-color">HABIT TRACKER</h1>
        <div className="alert alert-primary" role="alert">
        <h3 class="d-flex justify-content-center">Bugs:</h3>
          <ul class="d-flex justify-content-center">
            <li>Database takes NULL when form returns to user on error</li>
          </ul>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-danger m-3" onClick={() => window.location.href='https://github.com/Marc-Pozo/Habit-Tracker'}>Repo</button>
          <button className="btn btn-primary m-3">Click Me</button>
        </div>
        
      </div>
        
    );
}

export default landingPage;