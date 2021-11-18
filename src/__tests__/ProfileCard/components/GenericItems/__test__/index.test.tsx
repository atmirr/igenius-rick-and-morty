import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from 'src/utils/test-utils';
import BasicInfoItem from '../index';

const props = {
  species: 'Human',
  gender: 'Male',
  status: 'Alive',
};

describe('<BasicInfoItem />', () => {
  it('should renders the component with the given props', () => {
    const { container } = render(<BasicInfoItem {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display species this props has been passed', () => {
    render(<BasicInfoItem species={props.species} />);
    expect(screen.queryAllByText(props.species).length).toBe(1);
  });

  it('should display gender this props has been passed', () => {
    render(<BasicInfoItem gender={props.gender} />);
    expect(screen.queryAllByText(`(${props.gender})`).length).toBe(1);
  });

  it('should display status when this props has been passed', () => {
    render(<BasicInfoItem status={props.status} />);
    expect(screen.queryAllByText(props.status).length).toBe(1);
  });
});
