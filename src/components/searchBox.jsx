import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type='text'
      name='search'
      className=' form-control my-3'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='search...'
    />
  );
};

export default SearchBox;
