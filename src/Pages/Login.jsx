import React, { useState } from "react";
import LoginBox from "../Components/LoginBox";
import SignUpPage from "../Components/SignUpPage";
import ToastContainers from "../Components/common/ToastContainers";


function Login() {
    const [boxName,setBoxName]=useState('login')
    return (
       <>
       <ToastContainers/>
       {boxName=== 'login'&& <LoginBox setBoxName={setBoxName} />}
       {boxName=== 'signup'&& <SignUpPage setBoxName={setBoxName }/>}
       </>
    )

}

export default Login;