import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tasks header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Tasks/i);
  expect(headerElement).toBeInTheDocument();
});
