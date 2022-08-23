import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from 'App';

test('should render', async () => {
  await act(() => {
    render(<App />);
  })
  await screen.findByText('Category')
});

