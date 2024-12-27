import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import DropdownMenu from "../components/DropdownMenu";
import CodingSpace from "../components/CodingSpace";
import { memo, useEffect, useMemo, useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const [userState, setUserState] = useState(false)
    useEffect(() => {
        validateToken({ setUserState })
    }, [])

    const getLanguageList = () => {
        return (
            [
                "Text",
                "C",
                "CPP",
                "Go",
                "Java"
            ]
        )
    }
    const languageList = useMemo(
        () => getLanguageList(),
        [])

    const getExpiryPeriodList = () => {
        return (
            [
                "Period",
                "Burn After Read",
                "Seconds",
                "Minutes",
                "Hours",
                "Days",
                "Weeks",
                "Months",
                "Years"
            ]
        )
    }
    const expiryPeriodList = useMemo(
        () => getExpiryPeriodList(),
        [])

    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [language, setLanguage] = useState(languageList[0])
    const [expiryDuration, setExpiryDuration] = useState("")
    const [expiryPeriod, setExpiryPeriod] = useState(expiryPeriodList[0])

    return (
        <>
            <Container fluid className="h-100 m-0">
                <Row className="pb-3 h-100">
                    <Col md={7}>
                        <CodingSpace
                            placeholder={"Content goes here"}
                            language={language}
                            updateFunction={setContent}
                            value={content}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            className="w-75 fs-5"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <SyntaxOptions
                            languageList={languageList}
                            setLanguage={setLanguage}
                        />

                        <ExpiresAfterList
                            setExpiryDuration={setExpiryDuration}
                            expiryPeriodList={expiryPeriodList}
                            setExpiryPeriod={setExpiryPeriod}
                        />

                        <SubmitButton
                            content={content}
                            title={title}
                            language={language}
                            expiryDuration={expiryDuration}
                            expiryPeriod={expiryPeriod}
                            navigate={navigate}
                        />
                    </Col>
                </Row>
            </Container >
        </>
    )
}

const SyntaxOptions = memo(function SyntaxOptions({ languageList, setLanguage }) {
    return (
        <div className="dropdown-top-margin">
            <DropdownMenu
                heading={"Syntax"}
                items={languageList}
                updateFunction={setLanguage}
            />
        </div>
    )
})

function ExpiresAfterList({ setExpiryDuration, expiryPeriodList, setExpiryPeriod }) {
    return (
        <div className="dropdown-top-margin">
            <p className="font-weight-bold fs-5">Expires After</p>
            <Container className="m-0">
                <Row>
                    <Col className="m-0 p-0">
                        <Form.Control
                            placeholder="Duration (eg. 1, 2..)"
                            onChange={(e) => setExpiryDuration(e.target.value)} />
                    </Col>
                    <Col>
                        <DropdownMenu
                            items={expiryPeriodList}
                            updateFunction={setExpiryPeriod}>
                        </DropdownMenu>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function SubmitButton({ content, title, language, expiryDuration, expiryPeriod, navigate }) {
    return (
        <div className="position-fixed bottom-0 end-0 m-3">
            <Button onClick={() => submit({
                content: content,
                title: title,
                language: language,
                expiryDuration: expiryDuration,
                expiryPeriod: expiryPeriod,
                navigate: navigate
            })}
                variant="success"
                className="fs-5"
            >Submit</Button>
        </div>
    )
}

async function submit(data) {
    const reqBody = {
        content: data.content,
        title: data.title,
        contentType: data.language,
        expiresAfter: {
            expiryDuration: data.expiryDuration,
            expiryPeriod: data.expiryPeriod
        }
    }

    const token = JSON.parse(localStorage.getItem("jwt")).token
    const response = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(
            reqBody
        )
    })
    if (response.status == StatusCodes.CREATED) {
        const responseData = await response.json()
        data.navigate("/" + responseData.url)
    } else {
        console.log(response.statusText)
    }
}

function validateToken({ setUserState }) {
    let userData = localStorage.getItem("jwt")
    if (userData) {
        if (Date.now() > JSON.parse(userData).time + 3600000) {
            localStorage.removeItem("jwt")
            localStorage.setItem("login", false)
            setUserState(false)
        } else {
            setUserState(true)
        }
    } else {
        setUserState(false)
    }
}
