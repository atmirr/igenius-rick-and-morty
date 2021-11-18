import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from 'src/utils/test-utils';
import LocationItem from '../index';

const props = {
  label: 'Dimension',
  children: 'Replacement Dimension',
};

describe('<LocationItem />', () => {
  it('should renders the component', () => {
    const { container } = render(<LocationItem />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display label and children when these props has been set', () => {
    render(<LocationItem label={props.label}>{props.children}</LocationItem>);
    expect(screen.queryAllByText(`${props.label}:`).length).toBe(1);
    expect(screen.queryAllByText(props.children).length).toBe(1);
  });

  it('should support jsx element as the children', () => {
    const { container } = render(
      <LocationItem>
        <h6>I'm a JSX element</h6>
      </LocationItem>,
    );
    const h6Element = container.querySelectorAll('h6');
    expect(h6Element.length).toBe(1);
    expect(screen.queryAllByText("I'm a JSX element").length).toBe(1);
  });
});
