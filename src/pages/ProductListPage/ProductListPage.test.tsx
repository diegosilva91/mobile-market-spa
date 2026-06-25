import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { ProductListPage } from './ProductListPage';

const mockedUseProducts = vi.fn();

vi.mock('../../features/products/hooks/useProducts', () => ({
  useProducts: () => mockedUseProducts(),
}));

describe('ProductListPage', () => {
  it('filtra en tiempo real por marca y modelo sin distinción de mayúsculas', () => {
    mockedUseProducts.mockReturnValue({
      products: [
        { id: '1', brand: 'Apple', model: 'iPhone 15', price: '999', imageUrl: 'a' },
        { id: '2', brand: 'Samsung', model: 'Galaxy', price: '899', imageUrl: 'b' },
      ],
      isLoading: false,
      error: null,
      reload: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'iphone' } });

    expect(screen.getByRole('heading', { name: 'iPhone 15' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Galaxy' })).not.toBeInTheDocument();
  });

  it('muestra botón de reintento cuando hay error y ejecuta reload', () => {
    const reload = vi.fn();
    mockedUseProducts.mockReturnValue({
      products: [],
      isLoading: false,
      error: 'Error de red',
      reload,
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /reintentar/i }));

    expect(reload).toHaveBeenCalledTimes(1);
  });
});
