import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest';

import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renderiza el layout y la ruta inicial del listado', async () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: /ir al listado de productos/i }),
    ).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /listado de productos/i })).toBeInTheDocument();
    expect(screen.getByText('LIST VIEW')).toBeInTheDocument();
    expect(screen.getByLabelText(/productos en carrito: 0/i)).toBeInTheDocument();
  });

  it('abre el sidebar derecho del carrito al hacer click en el contador', async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole('button', { name: /productos en carrito: 0/i }));

    expect(screen.getByRole('heading', { name: /carrito/i })).toBeInTheDocument();
    expect(screen.getByText((_, element) => element?.textContent === 'Estado: Vacío')).toBeInTheDocument();
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });
});
