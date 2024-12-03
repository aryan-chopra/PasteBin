import { useState } from "react";
import { data, useLocation } from "react-router-dom";
import CodingSpace from "../components/CodingSpace";
import { Col, Container, Row, Stack } from "react-bootstrap";

export default function View() {
    const url = "http://localhost:8080" + useLocation().pathname

    const [resData, setResData] = useState(null);

    if (resData == null) {
        getResponse(url).then(
            response => {
                if (response.ok) {
                    getData(response).then(
                        data => {
                            console.log(data);
                            setResData(data)
                        }
                    ),
                        error => console.log("Error destructuring data: " + error)
                }
                else {
                    console.log("Response has error: " + response.status)
                }
            }
        ),
            error => console.log("Error fetching response: " + error)
    }

    return (
        <Display resBody={resData} />
    )
}

function Display({ resBody }) {
    if (resBody == null) {
        return (<></>)
    }

    else {
        return (
            <Stack className="pl-3 pr-3">
                <p className="font-weight-bold fs-3">{resBody.data.title}</p>
                <CodingSpace
                    readonly={true}
                    value={resBody.data.content}
                    language={resBody.data.contentType}
                    />
            </Stack>
        )
    }
}

async function getResponse(url) {
    const res = await fetch(url)

    return res
}

async function getData(res) {
    const data = await res.json()

    return data
}
