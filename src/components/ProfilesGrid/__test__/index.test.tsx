import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from 'src/utils/test-utils';
import { characters } from 'src/utils/mocked-data';

import ProfilesGrid from '../index';

describe('<ProfilesGrid />', () => {
  it('should renders the component', () => {
    const { container } = render(<ProfilesGrid />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display profiles if the profiles prop has been passed', () => {
    const { container } = render(<ProfilesGrid profiles={characters} />);
    expect(screen.queryAllByTestId('profiles-grid').length).toBe(1);
    const imageNodes = container.querySelectorAll('img');
    expect(imageNodes.length).toBe(2);
    expect(screen.queryAllByText(/Rick Sanchez/i).length).toBe(1);
    expect(screen.queryAllByText(/Human/i).length).toBe(2);
    expect(screen.queryAllByText(/(Male)/i).length).toBe(2);
    expect(screen.queryAllByText(/Alive/i).length).toBe(2);
  });

  it('should render 20 profile placeholders when the profiles prop is empty and isLoading prop has been set to true', () => {
    render(<ProfilesGrid profiles={[]} isLoading />);
    expect(screen.queryAllByTestId('profiles-grid').length).toBe(1);
    expect(
      screen.queryAllByTestId(/^(profile-placeholder-)+([0-9]{1,2})$/).length,
    ).toBe(20);
  });

  it('should render 20 profile placeholders when the isLoading prop has been set to true and the profiles prop has been passed', () => {
    render(<ProfilesGrid profiles={characters} isLoading />);
    expect(screen.queryAllByTestId('profiles-grid').length).toBe(1);
    expect(
      screen.queryAllByTestId(/^(profile-placeholder-)+([0-9]{1,2})$/).length,
    ).toBe(20);
  });

  it('should display an error text when error prop has been passed', () => {
    const error = '404: Not found!';
    render(<ProfilesGrid error={error} />);
    expect(
      screen.queryAllByText(`There is something wrong! Error: ${error}`).length,
    ).toBe(1);
  });
});
