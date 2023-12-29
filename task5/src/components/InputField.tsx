import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <div className='input-box'>
      {label && (
        <label htmlFor=''>{label}</label>
      )}
      <input {...rest} />
    </div>
  );
};

export default InputField;