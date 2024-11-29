import Form from 'react-bootstrap/Form';

export default function CodingSpace({placeholder, updateFunction, value, readonly = false }) {
  function onKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()

      const textarea = e.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newText = value.substring(0, start) + '\t' + value.substring(end)
      updateFunction(newText)
    }
  }

  return (
    <Form.Group className="mb-3 h-100 " controlId="exampleForm.ControlTextarea1">
      <Form.Control
        as="textarea"
        className='h-100 fs-4'
        disabled={readonly}
        onChange={(e) => updateFunction(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readonly}
        rows={3}
        style={{ resize: 'none' }}
        value={value} />
    </Form.Group>
  )
}
