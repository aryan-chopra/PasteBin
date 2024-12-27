import { useState } from "react";
import CentredInput from "../components/CentredInput";
import { StatusCodes } from "http-status-codes"

export default function Signin() {
    const [username, updateUsername] = useState("")
    const [password, updatePassword] = useState("")

    return (
        <CentredInput
            fields={[
                {
                    placeholder: "Username",
                    onChange: updateUsername
                },
                {
                    placeholder: "Password",
                    onChange: updatePassword
                }
            ]}
            button={{
                text: "Sign In",
                onClick: () => submit({ username, password })
            }}
        />
    )
}

async function submit({ username, password }) {
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
        console.log("success")
    } else {
        console.log(resData.message)
    }
}
