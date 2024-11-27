import Form from 'react-bootstrap/Form';

export default function CodingSpace({updateFunction}) {
  return (
    <Form.Group className="mb-3 h-100 flex-grow-7" controlId="exampleForm.ControlTextarea1">
      <Form.Control className='h-100 fs-4' as="textarea" rows={3} style={{ resize: 'none' }} onChange={(e) => updateFunction(e.target.value)}/>
    </Form.Group>
  )
}
