import React, { useState } from "react";
// import { toggleLoginRegister } from "./redux/actions";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./Auth.scss";

function Auth() {
    const [toggle, setToggle] = useState(false);
    const toggleButton1 = (
        <button onClick={() => setToggle(false)}>LOG IN &nbsp;<span>&#8594;</span></button>
    );
    const toggleButton2 = (
        <button onClick={() => setToggle(true)}>SIGN UP &nbsp;<span>&#8594;</span></button>
    );
    return (
        <div className="auth">
            <div className="auth-box">
                {
                    toggle ?
                        (<RegisterForm btn={toggleButton1}></RegisterForm>) :
                        (<LoginForm btn={toggleButton2}></LoginForm>)
                }
            </div>
        </div>
    );
}

export default Auth;
