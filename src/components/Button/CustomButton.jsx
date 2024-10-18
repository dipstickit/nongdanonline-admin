import { Button } from 'antd';
import React from 'react';

export default function CustomButton({ text, handleOnclick, styles, variant }) {
  const primary = variant ?? {
    backgroundColor: '#2FB95D',
    color: '#fff',
    width: '226px',
    fontWeight: '700',
    fontSize: '1rem',
    padding: 26,
  };
  return (
    <Button
      onClick={handleOnclick}
      style={{ border: 'none', ...primary, ...styles }}
    >
      {text}
    </Button>
  );
}
