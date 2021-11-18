import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  max-width: 600px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 100%;
  margin: 0 auto;
  padding: 10px 25px;
  text-align: center;
`;

const Input = styled.input`
  height: 60px;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  font-size: 1.2rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 0 20px;
  outline: none;
  border: 1px solid #00a0b8;
  background-color: #6fc3d0;
  &::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;

type PropTypes = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function SearchBox({
  handleChange,
  placeholder = 'Which character are you looking for?',
}: PropTypes): React.ReactElement {
  return (
    <InputWrapper>
      <Input placeholder={placeholder} onChange={handleChange} autoFocus />
    </InputWrapper>
  );
}

export default SearchBox;
