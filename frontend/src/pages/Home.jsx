import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import DropdownMenu from "../components/DropdownMenu";
import CodingSpace from "../components/CodingSpace";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const languageList = [
        "None",
        "C",
        "C++",
        "GoLang",
        "Java"
    ]

    const expiryPeriodList = [
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

    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [language, setLanguage] = useState(languageList[0])
    const [expiryDuration, setExpiryDuration] = useState("")
    const [expiryPeriod, setExpiryPeriod] = useState(expiryPeriodList[0])

    return (
        <Container fluid className="h-100 m-0">
            <Row className="pb-3 h-100">
                <Col md={7}>
                    <CodingSpace 
                    placeholder={"Content goes here"} 
                    updateFunction={setContent} 
                    value={content}
                     />
                </Col>
                <Col>
                    <Form.Control className="w-75 fs-5" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

                    <div className="dropdown-top-margin">
                        <DropdownMenu heading={"Syntax"} items={languageList} updateFunction={setLanguage} />
                    </div>

                    <div className="dropdown-top-margin">
                        <p className="font-weight-bold fs-5">Expires After</p>
                        <Container className="m-0">
                            <Row>
                                <Col className="m-0 p-0">
                                    <Form.Control placeholder="Duration (eg. 1, 2..)" onChange={(e) => setExpiryDuration(e.target.value)} />
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

                    <div className="position-fixed bottom-0 end-0 m-3">
                        <Button onClick={() => submit([content, title, language, expiryDuration, expiryPeriod])} variant="success" className="fs-5">Submit</Button>
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
        expiresAfter: {
            expiryDuration: data[3],
            expiryPeriod: data[4]
        }
    }

    console.log("Body: ");
    console.log(reqBody);



    const response = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            reqBody
        )
    })

    const responseData = await response.json()

    console.log(responseData._doc.url);

}
