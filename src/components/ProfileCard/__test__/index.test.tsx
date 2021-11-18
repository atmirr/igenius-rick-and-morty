import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from 'src/utils/test-utils';
import { characters, episodes, locations } from 'src/utils/mocked-data';
import ProfileCard from '../index';

const props = {
  name: characters[0].name,
  species: characters[0].species,
  status: characters[0].status,
  gender: characters[0].gender,
  image: characters[0].image,
  episodes,
  locationName: locations[0].name,
  locationType: locations[0].type,
  dimension: locations[0].dimension,
  numberOfResidents: 10,
};

describe('<ProfileCard />', () => {
  it('should renders the component', () => {
    const { container } = render(<ProfileCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display profile details when all the props has been passed', () => {
    const { container } = render(<ProfileCard {...props} />);
    expect(screen.queryAllByTestId('profile-card').length).toBe(1);
    const imageNodes = container.querySelectorAll('img');
    expect(imageNodes.length).toBe(1);
    expect(screen.queryAllByText(/Rick Sanchez/i).length).toBe(1);
    expect(screen.queryAllByText(/Human/i).length).toBe(1);
    expect(screen.queryAllByText(/(Male)/i).length).toBe(1);
    expect(screen.queryAllByText(/Alive/i).length).toBe(1);
    expect(screen.queryAllByTestId('episodes-item').length).toBe(1);
    expect(screen.queryAllByText(/Citadel of Ricks/i).length).toBe(1);
    expect(screen.queryAllByText(/Space station/i).length).toBe(1);
    expect(screen.queryAllByText(/unknown/i).length).toBe(1);
    expect(screen.queryAllByText(/10/i).length).toBe(1);
  });
});
