import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renderiza el layout y la ruta inicial del listado', async () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: /ir al listado de productos/i }),
    ).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /listado de productos/i })).toBeInTheDocument();
    expect(screen.getByText('LIST VIEW')).toBeInTheDocument();
    expect(screen.getByLabelText(/productos en carrito: 0/i)).toBeInTheDocument();
  });
});
