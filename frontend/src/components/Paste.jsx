import { Stack, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Paste({ title, content, contentType, url }) {
    const navigate = useNavigate()
    return (
        <Container
            className="border border-4 rounded p-2 hoverable mb-3"
            onClick={() => navigate("/" + url)}
        >
            <Row className="mb-3 border-bottom pb-3">
                <Col xs={11} className="fw-bold fs-4">{title}</Col>
                <Col className="fst-italic fw-light">{contentType}</Col>
            </Row>
            <Row>
                <p className="mb-0 fs-5">{content}</p>
            </Row>
        </Container>
    )
}
