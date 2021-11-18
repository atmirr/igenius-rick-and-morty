import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const Text = styled.span`
  font-size: 16px;
  color: #c53c3c;
`;

type PropTypes = {
  error: string;
};

function Error({ error }: PropTypes): React.ReactElement {
  const errorText = `Something went wrong! ${error}`;
  return (
    <Container>
      <Text>{errorText}</Text>
    </Container>
  );
}

export default Error;
