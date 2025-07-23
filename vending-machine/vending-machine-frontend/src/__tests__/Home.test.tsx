import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

jest.mock('../components/Navbar', () => () => <div data-testid="navbar">Mock Navbar</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Mock Footer</div>);
jest.mock('../components/ChocolateList', () => () => <div data-testid="chocolate-list">Mock ChocolateList</div>);

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('chocolate-list')).toBeInTheDocument();
  });

  it('has layout container with correct styles', () => {
    const { container } = render(<Home />);
    const rootBox = container.firstChild;

    expect(rootBox).toHaveStyle('display: flex');
    expect(rootBox).toHaveStyle('flex-direction: column');
    expect(rootBox).toHaveStyle('min-height: 100vh');
    expect(rootBox).toHaveStyle('background-color: #EBF3FF');
  });
});
