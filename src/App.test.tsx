import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', async () => {
  render(<BrowserRouter>
    <App /></BrowserRouter>);
  await screen.findByText('remera negra');

});
