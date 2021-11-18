import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from 'src/utils/test-utils';
import ProfilePlaceholders from '../index';

describe('<ProfilePlaceholders />', () => {
  it('should renders the component', () => {
    const { container } = render(<ProfilePlaceholders />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render 8 profile placeholders when the count prop has been set to 8', () => {
    render(<ProfilePlaceholders count={8} />);
    expect(
      screen.queryAllByTestId(/^(profile-placeholder-)+([0-9]{1,2})$/).length,
    ).toBe(8);
  });
});
