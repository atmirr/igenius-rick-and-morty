import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AppBar from '../index';

describe('<AppBar />', () => {
  it('should renders the component', () => {
    const { container } = render(<AppBar />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display the logo', () => {
    const { container } = render(<AppBar />);
    const imageNodes = container.querySelectorAll('img');
    expect(imageNodes.length).toBe(1);
  });
});
