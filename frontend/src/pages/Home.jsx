import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DropdownMenu from "../components/DropdownMenu";
import CodingSpace from "../components/CodingSpace";
import axios from "axios";
import { useState } from "react";

export default function Home() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [language, setLanguage] =  useState("")
    const [expiresAfter, setExpiresAfter] = useState("")

    // function updateContent(text) {
    //     setContent(text)
    // }

    // function updateTitle(newTitle) {
    //     setTitle(newTitle)
    // }

    // function updateLanguage(newLanguage) {
    //     setLanguage(newLanguage)
    // }

    // function updateExpiryTime(time) {
    //     setExpiresAfter(time)
    // }

    return (
        <Container fluid className="h-100 m-0">
            <Row className="pb-3 h-100">
                <Col md={7}>
                    <CodingSpace updateFunction={setContent}/>
                </Col>
                <Col>
                    <Form.Control className="w-75 fs-5" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>

                    <div className="dropdown-top-margin">
                        <DropdownMenu heading={"Syntax"} items={["None", "Java", "C", "C++", "GoLang"]} updateFunction={setLanguage} />
                    </div>

                    <div className="dropdown-top-margin">
                        <DropdownMenu heading={"Expires after"} items={["Never", "1 second", "1 minute", "1 hour", "1 day", "1 month", "1 year", "1 decade", "1 century", "1 eon", "1 proton life time"]} updateFunction={setExpiresAfter}></DropdownMenu>
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

    const response = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
            content: data[0],
            title: data[1],
            contentType: data[1],
            expiresAfter: data[2]
            }
        )
    })
    
    const responseData = await response.json()

    console.log(responseData._doc.url);
    
}
