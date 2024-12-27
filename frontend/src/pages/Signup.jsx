import { useState } from "react";
import { Button, Form, Placeholder, Stack } from "react-bootstrap";
import CentredInput from "../components/CentredInput";

export default function Signup() {
    const [username, updateUsername] = useState("")
    const [email, updateEmail] = useState("")
    const [password, updatePassword] = useState("")
    const [confirmPassword, updateConfirmPassword] = useState("")

    return (
        <CentredInput
            fields={[
                {
                    placeholder: "Username",
                    onChange: updateUsername
                },
                {
                    placeholder: "Email",
                    onChange: updateEmail
                },
                {
                    placeholder: "Password",
                    onChange: updatePassword
                },

                {
                    placeholder: "Confirm Password",
                    onChange: updateConfirmPassword
                },

            ]}
            button={{
                text: "Sign Up",
                onClick: () => submit({email, username, password})
            }}
        />
    )
}

async function submit({ email, username, password }) {
    console.log("doingsomething");

    const reqBody = {
        username: username,
        email: email,
        password: password
    }

    console.log(reqBody);

    const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    })

    const resData = await response.json()
    console.log(resData)
}
