import React from 'react';
import styled from 'styled-components';
import { CharacterType } from 'src/constants/types';

export const statusColors: { [key: string]: string } = {
  alive: '#55cc44',
  dead: '#d53d2e',
  unknown: '#9e9e9e',
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
  line-height: 1.4em;
  padding-bottom: 2px;
  color: #797979;
`;

const Divider = styled.span`
  padding: 0 3px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Status = styled.span`
  text-transform: capitalize;
`;

const StatusIcon = styled.span`
  height: 7px;
  width: 7px;
  margin-right: 4px;
  background-color: ${({ status }: { status: string }) => statusColors[status]};
  border-radius: 50%;
`;

const Species = styled.span`
  text-transform: capitalize;
`;

const Gender = styled.span`
  padding-left: 3px;
  font-size: 13px;
`;

type PropTypes = Partial<CharacterType>;

function GenericItems({
  species,
  status,
  gender,
}: PropTypes): React.ReactElement {
  return (
    <Container>
      {status && (
        <Wrapper>
          <StatusIcon
            data-testid="status-icon"
            status={status?.toLowerCase()}
          />
          <Status>{status}</Status>
        </Wrapper>
      )}
      <Divider>-</Divider>
      <Wrapper>
        {species && <Species>{species}</Species>}
        {gender && <Gender>({gender})</Gender>}
      </Wrapper>
    </Container>
  );
}

export default GenericItems;
