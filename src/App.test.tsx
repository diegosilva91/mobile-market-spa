import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renderiza el layout y la ruta inicial del listado', () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: /ir al listado de productos/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /listado de productos/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/productos en carrito: 0/i)).toBeInTheDocument();
  });
});
