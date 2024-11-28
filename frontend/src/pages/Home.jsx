import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import DropdownMenu from "../components/DropdownMenu";
import CodingSpace from "../components/CodingSpace";
import axios from "axios";
import { useState } from "react";

export default function Home() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [language, setLanguage] = useState("")
    const [expiresAfter, setExpiresAfter] = useState("")

    const languageList = [
        "None",
        "C",
        "C++",
        "GoLang",
        "Java"
    ]

    const expireAfterList = [
        "Period",
        "Burn After Read",
        "1 Hour",
        "1 Day",
        "1 Week",
        "2 Weeks",
        "1 Month",
        "6 Months",
        "1 Year"
    ]

    return (
        <Container fluid className="h-100 m-0">
            <Row className="pb-3 h-100">
                <Col md={7}>
                    <CodingSpace updateFunction={setContent} value={content} />
                </Col>
                <Col>
                    <Form.Control className="w-75 fs-5" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

                    <div className="dropdown-top-margin">
                        <DropdownMenu heading={"Syntax"} items={languageList} updateFunction={setLanguage} />
                    </div>

                    <div className="dropdown-top-margin">
                        <Container className="m-0">
                            <Row>
                                <Col className="m-0 p-0">
                                    <Form.Control placeholder="Duration (eg. 1, 2..)"/>
                                </Col>
                                <Col>
                                    <DropdownMenu
                                        // heading={"Expires after"}
                                        items={expireAfterList}
                                        updateFunction={setExpiresAfter}>
                                    </DropdownMenu>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <div className="position-fixed bottom-0 end-0 m-3">
                        <Button onClick={() => submit([content, title, language, expiresAfter])} variant="success" className="fs-5">Submit</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

async function submit(data) {

    const reqBody = {
        content: data[0],
        title: data[1],
        contentType: data[2],
        expiresAfter: data[3]
    }

    console.log("Body: ");
    console.log(reqBody);



    const response = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            // reqBody
            {
                content: data[0],
                title: data[1],
                contentType: data[2],
                expiresAfter: data[3]
            }

        )
    })

    const responseData = await response.json()

    console.log(responseData._doc.url);

}
