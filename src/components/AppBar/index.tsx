// @flow
import React from 'react';
import styled from 'styled-components';
import RickAndMortyLogo from 'src/assets/svgs/rick-and-morty-logo.svg';
import SearchBox from './components/SearchBox';

const HEADER_BOX_SHADOW =
  '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)';

const Header = styled.div`
  width: 100%;
  background-color: #11b0c8;
  border-bottom: 1px solid #06a3bb;
  padding: 10px 25px;
  height: 90px;
  box-shadow: ${HEADER_BOX_SHADOW};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 60px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

type PropTypes = {
  handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function AppBar({ handleKeywordChange }: PropTypes): React.ReactElement {
  return (
    <Header>
      <Container>
        <Logo src={RickAndMortyLogo} alt="Rick & Morty logo" />
        <SearchWrapper>
          <SearchBox handleChange={handleKeywordChange} />
        </SearchWrapper>
      </Container>
    </Header>
  );
}

export default AppBar;
