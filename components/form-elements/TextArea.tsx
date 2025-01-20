import React, { useState } from 'react';

const TextArea = ({ placeholder, onChange }) => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <textarea
      placeholder={placeholder}
      value={text}
      onChange={handleTextChange}
    />
  );
};

export default TextArea;
