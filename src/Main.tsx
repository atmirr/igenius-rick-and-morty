import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { debounce } from 'lodash';
import styled from 'styled-components';
import AppBar from './components/AppBar';
import ProfilesGrid from './components/ProfilesGrid';
import ProfileDetail from './components/ProfileDetail';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0 40px 0;
`;

function Main(): React.ReactElement {
  const [keyword, setKeyword] = useState<string>();
  // Make a 500ms delay for the search queries
  // to have a better UX
  // and prevent making too much requests at once
  const debouncedSetKeyword = debounce(setKeyword, 500);
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedSetKeyword(query);
  };
  return (
    <>
      <AppBar handleKeywordChange={handleKeywordChange} />
      <Container>
        <Routes>
          <Route path="/" element={<ProfilesGrid keyword={keyword} />} />
          <Route path="profile/:profileId" element={<ProfileDetail />} />
        </Routes>
      </Container>
    </>
  );
}

export default Main;
