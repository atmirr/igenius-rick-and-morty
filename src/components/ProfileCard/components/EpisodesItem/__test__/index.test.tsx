import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, fireEvent } from 'src/utils/test-utils';
import { episodes } from 'src/utils/mocked-data';
import EpisodesItem from '../index';

const props = {
  label: 'Chapters',
  children: episodes,
};

describe('<EpisodesItem />', () => {
  it('should renders the component', () => {
    const { container } = render(<EpisodesItem />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should support default value for the label', () => {
    render(<EpisodesItem>{props.children}</EpisodesItem>);
    expect(screen.queryAllByText(/Episodes:/i).length).toBe(1);
  });

  it('should support custom value for the label', () => {
    render(<EpisodesItem label={props.label}>{props.children}</EpisodesItem>);
    expect(screen.queryAllByText(`${props.label}:`).length).toBe(1);
  });

  it('should not display "more episodes" label when the children array has just one key', () => {
    render(<EpisodesItem>{[props.children[0]]}</EpisodesItem>);
    expect(screen.queryAllByText(/(and )+([0-9]*)+( more)/i).length).toBe(0);
    expect(screen.queryAllByText(props.children[0]).length).toBe(1);
  });

  it('should display "more episodes" label when the children array has more than one key', () => {
    render(<EpisodesItem>{props.children}</EpisodesItem>);
    expect(screen.queryAllByText(props.children[0]).length).toBe(1);
    expect(screen.queryAllByText(/and 4 more/i).length).toBe(1);
  });

  it('should open the episodes modal when user clicks on the "and %count% more" link', () => {
    render(<EpisodesItem>{props.children}</EpisodesItem>);
    const moreLink = screen.getByText(/and 4 more/i);
    fireEvent.click(moreLink);
    expect(screen.getAllByTestId('modal').length).toBe(1);
  });
});
