import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

import { getProductDetail } from '../../features/products/services/productService';
import type { ProductDetail } from '../../features/products/types/product.types';
import { apiRequest } from '../../shared/services/apiClient';
import './ProductDetailPage.css';

type LayoutContext = {
  setCartCount: (count: number) => void;
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const { setCartCount } = useOutletContext<LayoutContext>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedStorageCode, setSelectedStorageCode] = useState<number | ''>('');
  const [selectedColorCode, setSelectedColorCode] = useState<number | ''>('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!productId) {
      return;
    }

    void getProductDetail(productId).then((productDetail) => {
      setProduct(productDetail);
      setSelectedStorageCode(productDetail.storages.length === 1 ? productDetail.storages[0].code : '');
      setSelectedColorCode(productDetail.colors.length === 1 ? productDetail.colors[0].code : '');
    });
  }, [productId]);

  const canAddToCart = Boolean(product && selectedStorageCode !== '' && selectedColorCode !== '');

  async function handleAddToCart() {
    if (!product || selectedStorageCode === '' || selectedColorCode === '') {
      return;
    }

    const response = await apiRequest<{ count: number }>('/api/cart', {
      method: 'POST',
      body: {
        id: product.id,
        storageCode: selectedStorageCode,
        colorCode: selectedColorCode,
      },
    });

    setCartCount(response.count);
    setMessage('Producto añadido al carrito.');
  }

  return (
    <section className="detail-section" aria-labelledby="product-detail-title">
      <Link className="back-link" to="/">
        ← Volver al listado
      </Link>

      {!product && <p className="detail-state">Cargando detalle...</p>}

      {product && (
        <div className="detail-layout">
          <div className="product-image-placeholder">Imagen del producto</div>

          <article className="detail-panel">
            <p className="detail-panel__eyebrow">DETAILS VIEW</p>
            <h1 id="product-detail-title">
              {product.brand} {product.model}
            </h1>
            <p className="detail-panel__price">{product.price}</p>

            <ul className="technical-list">
              {product.cpu && <li>CPU: {product.cpu}</li>}
              {product.ram && <li>RAM: {product.ram}</li>}
              {product.os && <li>Sistema operativo: {product.os}</li>}
              {product.battery && <li>Batería: {product.battery}</li>}
            </ul>

            <div className="actions-panel">
              <label>
                Almacenamiento
                <select
                  onChange={(event) => setSelectedStorageCode(Number(event.target.value))}
                  value={selectedStorageCode}
                >
                  <option value="" disabled>
                    Selecciona almacenamiento
                  </option>
                  {product.storages.map((storage) => (
                    <option key={storage.code} value={storage.code}>
                      {storage.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Color
                <select onChange={(event) => setSelectedColorCode(Number(event.target.value))} value={selectedColorCode}>
                  <option value="" disabled>
                    Selecciona color
                  </option>
                  {product.colors.map((color) => (
                    <option key={color.code} value={color.code}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </label>

              <button disabled={!canAddToCart} onClick={handleAddToCart} type="button">
                Añadir al carrito
              </button>
              {message && <p role="status">{message}</p>}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
