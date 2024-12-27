import { memo, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import SyntaxHighlighter from 'react-syntax-highlighter';

const CodingSpace = memo(function CodingSpace({ placeholder, updateFunction, language, value, readonly = false }) {
  const [textArea, setTextArea] = useState(null)

  useEffect(() => {
    if (textArea != null) {
      textArea[0].selectionEnd = textArea[1] + 1
      setTextArea(null)
    }
  }, [textArea])

  function onKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()

      const textarea = e.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newText = value.substring(0, start) + '\t' + value.substring(end)
      updateFunction(newText)
      setTextArea([textarea, start])
    }
  }

  return (
    <Form.Group className="position-relative mb-3 h-100 " controlId="exampleForm.ControlTextarea1">
      <SyntaxHighlighter
        className='bg-white h-100 fs-4 p-1 m-0'
        language={language.toLowerCase()}
        wrapLongLines={true}
      >
        {value}
      </SyntaxHighlighter >
      <Form.Control
        as="textarea"
        className='position-absolute top-0 h-100 fs-4 p-1 code-space'
        disabled={readonly}
        onChange={(e) => updateFunction(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readonly}
        rows={3}
        style={{
          resize: 'none',
          backgroundColor: 'transparent',
          color: 'black',
          WebkitTextFillColor: 'transparent',
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
          overflow: "hidden"
        }}
        value={value} />
    </Form.Group>
  )
})

export default CodingSpace
