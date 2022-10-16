import React from 'react';

interface SearchProps {
  onChange: (event: { target: { value: React.SetStateAction<string> } }) => void;
}
const Search = React.forwardRef<HTMLInputElement, SearchProps>(({ onChange }, ref) => {
  return <input type="text" placeholder="Search" onChange={onChange} ref={ref} autoFocus />;
});

export default Search;
