import { useState } from 'react'

interface Props {
  initialValue?: string | string[]
  label?: string
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  placeholder?: string
}

const InputField: React.FC<Props> = ({ initialValue = '', onChange, label, name, placeholder }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event)
    }
  }

  return (

    <div className='input-box'>
      {label && (
        <label htmlFor=''>{label}</label>
      )}
      <input type="text" name={name} value={initialValue} onChange={handleChange} placeholder={placeholder} />
    </div>
  )
}

export default InputField