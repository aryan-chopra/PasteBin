import Form from 'react-bootstrap/Form';

export default function CodingSpace({placeholder, updateFunction, value, readonly=false}) {
  return (
    <Form.Group className="mb-3 h-100 " controlId="exampleForm.ControlTextarea1">
      <Form.Control placeholder={placeholder} readOnly={readonly} disabled={readonly} value={value} className='h-100 fs-4' as="textarea" rows={3} style={{ resize: 'none' }} onChange={(e) => updateFunction(e.target.value)}/>
    </Form.Group>
  )
}
