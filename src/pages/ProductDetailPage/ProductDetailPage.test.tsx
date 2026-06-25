import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { ProductDetailPage } from './ProductDetailPage';

const getProductDetailMock = vi.fn();
const addToCartMock = vi.fn();

vi.mock('../../features/products/services/productService', () => ({
  getProductDetail: (...args: unknown[]) => getProductDetailMock(...args),
}));

vi.mock('../../features/cart/services/cartService', () => ({
  addToCart: (...args: unknown[]) => addToCartMock(...args),
}));

function renderProductDetail(setCartCount = vi.fn()) {
  return render(
    <MemoryRouter initialEntries={['/products/1']}>
      <Routes>
        <Route element={<Outlet context={{ setCartCount }} />}>
          <Route path="/products/:productId" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProductDetailPage', () => {
  it('muestra el detalle y permite añadir al carrito', async () => {
    const setCartCount = vi.fn();

    getProductDetailMock.mockResolvedValue({
      id: '1',
      brand: 'Apple',
      model: 'iPhone',
      price: '999',
      imageUrl: 'https://example.com/iphone.png',
      colors: [{ code: 1, name: 'Black' }],
      storages: [{ code: 2, name: '256GB' }],
      cpu: 'A17',
    });
    addToCartMock.mockResolvedValue({ count: 3 });

    renderProductDetail(setCartCount);

    await screen.findByRole('heading', { name: /apple iphone/i });
    fireEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }));

    await waitFor(() => {
      expect(addToCartMock).toHaveBeenCalledWith({
        id: '1',
        colorCode: 1,
        storageCode: 2,
      });
    });
    expect(setCartCount).toHaveBeenCalledWith(3);
  });

  it('muestra estado de error cuando falla la carga', async () => {
    getProductDetailMock.mockRejectedValue(new Error('Fallo al cargar'));

    renderProductDetail();

    expect(await screen.findByText(/fallo al cargar/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reintentar/i })).toBeInTheDocument();
  });
});
