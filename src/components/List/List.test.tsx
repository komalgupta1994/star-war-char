import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import List from './index';

jest.mock('./List.module.css', () => ({}));

describe('Character List', () => {
  it('renders Star Wars characters', () => {
    const mockData = {
      results: [
        {
          name: 'Luke Skywalker',
          gender: 'male',
          homeworld: 'Tatooine',
          url: 'https://swapi.dev/api/people/1/'
        },
      ]
    };

    render(<List characters={mockData} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  })

  it('When not getting any characters', () => {
    const mockData: any = {}

    render(<List characters={mockData} />);
    const rows = screen.queryAllByRole('tr');
    expect(rows.length).toBe(0);
  });
})


