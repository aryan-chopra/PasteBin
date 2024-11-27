import { Col, Container, Row } from "react-bootstrap";
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
                    <DropdownMenu items={["None", "Java", "C", "C++", "GoLang"]}/>
                </Col>
            </Row>
        </Container>
    )
}
