import React, { useState } from 'react'

import { Input, Button } from '@alicloud/console-components'

const SaveComponent = (props) => (
  <div>
    <p>
      <Input
        onChange={props.handleChange}
        value={props.text}
      />
    </p>
    <Button onClick={props.handleSave}>
      Save
    </Button>
  </div>
)

const EditComponent = (props) => (
  <Button onClick={props.handleEdit}>
    Edit
  </Button>
)

const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? <EitherComponent {...props} />
    : <Component {...props} />;

const isViewConditionFn = ({ mode = 'view' }) => mode === 'view';
const withEditContionalRendering = withEither(isViewConditionFn, EditComponent);
const EditSaveWithConditionalRendering = withEditContionalRendering(SaveComponent);

/**
 * https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e/
 * @returns {string} The sum of the two numbers.
 */
function EditDemo() {
  const [text, setText] = useState('')
  const [inputText, setInputText] = useState('')
  const [mode, setMode] = useState('view')

  const handleChange = (value) => setInputText(value)
  const handleSave = () => {
    setText(inputText)
    setMode('view')
  }
  const handleEdit = () => setMode('edit')


  return (
    <div>
      <p>Text: {text}</p>
      <EditSaveWithConditionalRendering
        mode={mode}
        handleEdit={handleEdit}
        handleChange={handleChange}
        handleSave={handleSave}
        text={inputText}
      />
    </div>
  )
}

export default EditDemo
