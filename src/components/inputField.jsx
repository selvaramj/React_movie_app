import React from 'react';

const Input = (props) => {
  const { name, label, error, ...rest } = props;
  //console.log('props ', props);
  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input {...rest} name={name} id={name} className='form-control' />
      {error && <p className='alert alert-danger'>{error}</p>}
    </div>
  );
};

export default Input;
