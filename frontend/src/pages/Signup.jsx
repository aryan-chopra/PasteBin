import { useState } from "react";
import { Button, Form, Placeholder, Stack } from "react-bootstrap";
import CentredInput from "../components/CentredInput";
import { StatusCodes } from "http-status-codes";

export default function Signup() {
    const [username, updateUsername] = useState("")
    const [usernameError, updateUsernameError] = useState("")
    const [email, updateEmail] = useState("")
    const [emailError, updateEmailError] = useState("")
    const [password, updatePassword] = useState("")
    const [passwordError, updatePasswordError] = useState("")
    const [confirmPassword, updateConfirmPassword] = useState("")
    const [confirmPasswordError, updateConfirmPasswordError] = useState("")

    function setUsername(text) {
        updateUsername(text)
        updateUsernameError("")
    }

    function setEmail(text) {
        updateEmail(text)
        updateEmailError("")
    }
    function setPassword(text) {
        updatePassword(text)
        updatePasswordError("")
        updateConfirmPasswordError("")
    }
    function setConfirmPassword(text) {
        updateConfirmPassword(text)
        updateConfirmPasswordError("")
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
                    placeholder: "Email",
                    onChange: setEmail,
                    error: emailError
                },
                {
                    placeholder: "Password",
                    onChange: setPassword,
                    type: "password",
                    error: passwordError
                },

                {
                    placeholder: "Confirm Password",
                    onChange: setConfirmPassword,
                    type: "password",
                    error: confirmPasswordError
                },

            ]}
            button={{
                text: "Sign Up",
                onClick: () => submit({ email, username, password, confirmPassword, updateUsernameError, updateEmailError, updatePasswordError, updateConfirmPasswordError })
            }}
        />
    )
}

async function submit({ email, username, password, confirmPassword, updateUsernameError, updateEmailError, updatePasswordError, updateConfirmPasswordError }) {
    if (username.length == 0) {
        updateUsernameError("Username can not be empty")
    } else if (email.length == 0) {
        updateEmailError("Email can not be empty")
    } else if (password.length < 6) {
        updatePasswordError("Password must be at least six characters long")
    } else if (confirmPassword.length == 0) {
        updateConfirmPasswordError("Field can not be empty")
    } else if (!isValidEmail(email)) {
        updateEmailError("Invalid Email")
    } else if (!isValidPassword(password)) {
        updatePasswordError("Password must contain at least one number, special case character, lower case, and upper case letter")
    } else if (!(password === confirmPassword)) {
        updatePasswordError("Passwords do not match")
        updateConfirmPasswordError("Passwords do not match")
    } else {
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
        if (response.status == StatusCodes.OK) {
            const tokenData = JSON.stringify({
                token: resData.token,
                time: Date.now()
            })
            localStorage.setItem("jwt", tokenData)
            console.log("success")
            navigate("/")
        } else if (response.status == StatusCodes.CONFLICT) {
            switch (resData.message) {
                case "email":
                    updateEmailError("Email already exists")
                    break;
                
                case "username":
                    updateUsernameError("Username already in use")
                    break;
                
                default:
                    break;
            }
        } else {
            updateUsernameError("Some error occured, please try again later")
        }
    }
}

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function isValidPassword(pw) {

    return /[A-Z]/.test(pw) &&
        /[a-z]/.test(pw) &&
        /[0-9]/.test(pw) &&
        /[^A-Za-z0-9]/.test(pw) &&
        pw.length > 5;

}
