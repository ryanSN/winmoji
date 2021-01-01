import React from 'react';

const Search = React.forwardRef(({ onChange }, inputRef) => {
  return <input type="text" autoFocus placeholder="Search" onChange={onChange} ref={inputRef} />;
});

export default Search;
