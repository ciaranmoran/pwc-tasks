import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Task List header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Task List/i);
  expect(headerElement).toBeInTheDocument();
});
