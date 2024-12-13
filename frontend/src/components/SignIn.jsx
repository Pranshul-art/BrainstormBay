import { useState } from "react"
import { InputBox } from "../commonComponents/InputBox"
import { Button } from "../commonComponents/Button"
import { ButtonWarning } from "../commonComponents/ButtonWarning"
import  axios  from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () =>{
   const navigate=useNavigate() 
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')

    return <div className="bg-clip-padding bg-gradient-to-tr from-slate-300 to-gray-900 flex justify-center h-screen w-full">
        <div className="flex flex-col justify-center ">
            <div className="bg-white shadow-lg rounded-lg w-96 h-max p-3 bg-gradient-to-r from-slate-400 to-gray-600">
                <div className="text-4xl font-bold rounded flex justify-center bg-clip-padding bg-gradient-to-r from-slate-400 to-gray-600 p-3">
                    Sign In
                </div>
                <div className="text-md flex justify-center bg-clip-padding bg-gradient-to-r from-slate-400 to-gray-600  pt-2 pb-8 ">
                    Enter your credentials to access your account
                </div>
                <div className=" px-5 bg-clip-padding bg-gradient-to-r from-slate-400 to-gray-600">
                    <InputBox label={"Email"} onChange={(e)=>{
                        setEmail(e.target.value)
                    }} placeholder={"john249@gmail.com"} />
                    <InputBox label={"Password"} onChange={e=>{
                        setPassword(e.target.value)
                    }} placeholder={"Password #min(6)"}/>
                
                    <Button label={"Sign In"}  onClick={async ()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/users/signin",{
                        email,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    localStorage.setItem("name",email[0])
                    navigate("/dashboard?name=" + email[0])

                }}/>
                </div>
                
                <ButtonWarning label={"Don't have an account?"} target={"Sign Up"}  to={"/"} />
            </div>
        </div>
    </div>
}