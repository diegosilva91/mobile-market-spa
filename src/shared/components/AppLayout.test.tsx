import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useOutletContext } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import type { AppLayoutOutletContext } from './AppLayout';
import { AppLayout } from './AppLayout';

function TestChild() {
  const { addCartItem } = useOutletContext<AppLayoutOutletContext>();

  return (
    <button
      type="button"
      onClick={() =>
        addCartItem({
          productId: '1',
          brand: 'Apple',
          model: 'iPhone 15',
          imageUrl: 'https://example.com/iphone.png',
          priceLabel: '999',
          unitPrice: 999,
          colorCode: 1,
          colorName: 'Black',
          storageCode: 2,
          storageName: '256GB',
        })
      }
    >
      Agregar demo
    </button>
  );
}

describe('AppLayout', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('permite ver items, sumar/restar unidades y eliminar desde el sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<TestChild />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /agregar demo/i }));
    fireEvent.click(screen.getByRole('button', { name: /productos en carrito: 1/i }));

    expect(screen.getByRole('heading', { name: /apple iphone 15/i })).toBeInTheDocument();
    expect(screen.getByText(/precio unitario: 999/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/unidades de apple iphone 15/i)).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: /añadir una unidad de apple iphone 15/i }));
    expect(screen.getByLabelText(/unidades de apple iphone 15/i)).toHaveTextContent('2');

    fireEvent.click(screen.getByRole('button', { name: /quitar una unidad de apple iphone 15/i }));
    expect(screen.getByLabelText(/unidades de apple iphone 15/i)).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: /eliminar apple iphone 15 del carrito/i }));
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });
});
