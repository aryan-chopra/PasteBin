import { Form, Button, Stack } from "react-bootstrap"

export default function CentredInput({ fields, button, errorMessage }) {
    let inputFields = fields.map((field) => {
        return (
            <div key={field.placeholder}>
            <p className="text-danger">{field.error}</p>
            <Form.Control
                className="mx-auto mb-4 w-100 fs-5"
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                type={field.type}/>
            </div>
        )
    })
    let error = <p>{errorMessage}</p>

    return (
        <Stack className="position-absolute top-50 start-50 translate-middle border rounded p-5 w-50">
            {error}
            {inputFields}
            <Button onClick={button.onClick} className="fs-5">{button.text}</Button>
        </Stack>
    )
}