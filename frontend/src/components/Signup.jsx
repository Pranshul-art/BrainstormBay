import { useState } from "react"
import { InputBox } from "../commonComponents/InputBox"
import { Button } from "../commonComponents/Button"
import { ButtonWarning } from "../commonComponents/ButtonWarning"
import  axios  from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () =>{
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [lastName,setLastName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    return <div className="bg-clip-padding bg-gradient-to-tr from-slate-300 to-gray-900 flex justify-center h-screen w-full">
        <div className="flex flex-col justify-center ">
            <div className="bg-white shadow-lg rounded-lg w-96 h-max p-3 bg-gradient-to-r from-slate-400 to-gray-600">
                <div className="text-4xl font-bold rounded flex justify-center bg-clip-padding bg-gradient-to-r from-slate-400 to-gray-600 p-3">
                    Sign Up
                </div>
                <div className="text-md flex justify-center bg-clip-padding bg-gradient-to-r from-slate-400 to-gray-600  pt-2 pb-8 ">
                    Enter your information to create an account
                </div>
                <div className=" px-5 bg-clip-padding bg-gradient-to-r from-slate-400 to-gray-600">
                    <InputBox label={"Email"} onChange={e=>{
                        setEmail(e.target.value)
                    }} placeholder={"John"}/>
                    <InputBox label={"Username"} onChange={(e)=>{
                        setUsername(e.target.value)
                    }} placeholder={"John243"} />
                    <InputBox label={"Password"} onChange={e=>{
                        setPassword(e.target.value)
                    }} placeholder={"Password"}/>
                
                <Button label={"Sign Up"}   onClick={async ()=>{
                const response=await axios.post("http://localhost:3000/api/v1/users/signup",{
                    username,
                    email,
                    password
                })
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("name",username[0])
                navigate("/dashboard?name=" + username[0])
            }}/>
                </div>
                
                <ButtonWarning label={"Already have an account?"} target={"Sign In"}  to={"/signin"} />
            </div>
        </div>
    </div>
}