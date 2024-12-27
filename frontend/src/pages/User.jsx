import { useEffect, useState } from "react";
import Paste from "../components/Paste";

export default function User() {
    const [resData, setResData] = useState([])
    const [pastes, setPastes] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/pastes", {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt")).token
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.statusText)
            })
            .then((data) => {
                setResData(data.data)
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        let collection = resData.map((item) => {
            return (
                <Paste
                    content={item.content}
                    contentType={item.contentType}
                    title={item.title}
                    url={item.url}
                    
                />
            )
        })
        setPastes(collection)
    }, [resData])

    if (pastes.length == 0) {
        return <p>Loading...</p>
    } else {
        return (
            <div>
                {pastes}
            </div>
        )
    }
}