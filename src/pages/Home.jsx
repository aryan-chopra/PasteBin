import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DropdownMenu from "../components/DropdownMenu";
import CodingSpace from "../components/CodingSpace";

export default function Home() {
    return (
        <Container fluid className="h-100 m-0">
            <Row className="pb-3 h-100">
                <Col md={7}>
                    <CodingSpace />
                </Col>
                <Col>
                    <Form.Control className="w-75 fs-5" placeholder="Title"/>

                    <div className="dropdown-top-margin">
                        <DropdownMenu heading={"Syntax"} items={["None", "Java", "C", "C++", "GoLang"]} />
                    </div>

                    <div className="dropdown-top-margin">
                        <DropdownMenu heading={"Expires after"} items={["Never", "1 second", "1 minute", "1 hour", "1 day", "1 month", "1 year", "1 decade", "1 century", "1 eon", "1 proton life time"]}></DropdownMenu>
                    </div>

                    <div className="position-fixed bottom-0 end-0 m-3">
                        <Button variant="success" className="fs-5">Submit</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
