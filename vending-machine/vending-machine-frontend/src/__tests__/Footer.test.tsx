import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders the footer text with current year', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    const footerText = screen.getByText(
      new RegExp(`© ${currentYear} CandyCo. All rights reserved.`, 'i')
    );

    expect(footerText).toBeInTheDocument();
  });
});
