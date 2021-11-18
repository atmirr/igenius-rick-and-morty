import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

const PlaceholderWrapper = styled.div`
  margin: 1.1em 0.7em;
  border: 3px solid #f3f3f3;
  border-radius: 15px;
`;

type PropTypes = {
  count: number;
  [key: string]: string | number;
};

const ProfilePlaceholder = (props: { [key: string]: string | number }) => (
  <PlaceholderWrapper>
    <ContentLoader
      speed={1}
      width={273}
      height={315}
      viewBox="0 0 273 293"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="35" y="25" rx="15" ry="15" width="210" height="200" />
      <rect x="65" y="260" rx="0" ry="0" width="150" height="10" />
    </ContentLoader>
  </PlaceholderWrapper>
);

function ProfilePlaceholders({
  count = 1,
  ...props
}: PropTypes): React.ReactElement {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((value, i) => (
          <ProfilePlaceholder
            key={i}
            uniqueKey={`profile-placeholder-${i}`}
            data-testid={`profile-placeholder-${i}`}
            {...props}
          />
        ))}
    </>
  );
}

export default ProfilePlaceholders;
