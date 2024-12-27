import { Form, Button, Stack } from "react-bootstrap"

export default function CentredInput({ fields, button }) {
    let inputFields = fields.map((field) => {
        return (
            <Form.Control
                className="mx-auto mb-4 w-100 fs-5"
                placeholder={field.placeholder}
                onChange={(e) => field.onChange(e.target.value)} />
        )
    })

    console.log(inputFields);


    return (
        <Stack className="position-absolute top-50 start-50 translate-middle border rounded p-5 w-50">
            {inputFields}
            <Button onClick={button.onClick} className="fs-5">{button.text}</Button>
        </Stack>
    )
}