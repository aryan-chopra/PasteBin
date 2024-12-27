import { useContext, useState } from "react";
import CentredInput from "../components/CentredInput";
import { StatusCodes } from "http-status-codes"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Signin() {
    const {user, setUser} = useContext(UserContext)
    const [username, updateUsername] = useState("")
    const [password, updatePassword] = useState("")
    const [usernameError, updateUsernameError] = useState("")
    const [passwordError, updatePasswordError] = useState("")
    const navigate = useNavigate()

    function setUsername(text) {
        updateUsername(text)
        updateUsernameError("")
    }

    function setPassword(text) {
        updatePassword(text)
        updatePasswordError("")
    }

    return (
        <CentredInput
            fields={[
                {
                    placeholder: "Username",
                    onChange: setUsername,
                    error: usernameError
                },
                {
                    placeholder: "Password",
                    onChange: setPassword,
                    error: passwordError,
                    type: "password"
                }
            ]}
            button={{
                text: "Sign In",
                onClick: () => submit({ username, password, navigate, setUser, updateUsernameError, updatePasswordError })
            }}
        />
    )
}

async function submit({ username, password, navigate, setUser, updateUsernameError, updatePasswordError }) {
    if (username.length == 0) {
        updateUsernameError("Username can not be empty")
    }
    if (password.length == 0) {
        updatePasswordError("Password can not be empty")
    }
    else {
        const reqBody = {
            username: username,
            password: password
        }

        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        })

        if (response.status == StatusCodes.OK) {
            const resData = await response.json()
            const tokenData = JSON.stringify({
                token: resData.token,
                time: Date.now()
            })
            localStorage.setItem("jwt", tokenData)
            localStorage.setItem("login", true)
            setUser(true)
            console.log("success")
            navigate("/")
        } else if (response.status == StatusCodes.UNAUTHORIZED){
            updateUsernameError("The combination of username and password does not match")
        } else {
            updateUsernameError("Some error occured, please try again later")
        }
    }
}
