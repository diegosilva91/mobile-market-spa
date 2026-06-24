import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renderiza la pantalla inicial del proyecto', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /mobile market spa/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/react, typescript y vite/i)).toBeInTheDocument();
  });
});
