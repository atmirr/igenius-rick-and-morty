import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 4px 0;
`;

const Label = styled.span`
  font-size: 15px;
  color: #797979;
`;

const Value = styled.span`
  font-size: 16px;
`;

type PropTypes = {
  label: string;
  children: string | React.ReactNode;
};

function DetailItem({ label, children }: PropTypes): React.ReactElement {
  return (
    <Container>
      <Label>{label}:</Label>
      <Value>{children}</Value>
    </Container>
  );
}

export default DetailItem;
