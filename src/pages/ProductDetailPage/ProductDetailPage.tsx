import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

import { addToCart } from '../../features/cart/services/cartService';
import { getProductDetail } from '../../features/products/services/productService';
import type { ProductDetail } from '../../features/products/types/product.types';
import type { AppLayoutOutletContext } from '../../shared/components/AppLayout';
import './ProductDetailPage.css';

function parsePrice(value: string) {
  const cleanedValue = value.replace(/[^0-9,.-]/g, '');
  if (!cleanedValue) {
    return 0;
  }

  const lastComma = cleanedValue.lastIndexOf(',');
  const lastDot = cleanedValue.lastIndexOf('.');
  if (lastComma > lastDot) {
    const normalized = cleanedValue.replace(/\./g, '').replace(',', '.');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const normalized = cleanedValue.replace(/,/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function ProductDetailPage() {
  const { productId } = useParams();
  const { addCartItem, openCart } = useOutletContext<AppLayoutOutletContext>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedStorageCode, setSelectedStorageCode] = useState<number | ''>('');
  const [selectedColorCode, setSelectedColorCode] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);

  async function loadProductDetail(currentProductId: string) {
    setError(null);
    setIsLoading(true);
    setProduct(null);
    setMessage(null);

    const productDetail = await getProductDetail(currentProductId);
    if (!productDetail.id) {
      throw new Error('No se encontró el producto solicitado.');
    }

    setProduct(productDetail);
    setSelectedStorageCode(productDetail.storages.length === 1 ? productDetail.storages[0].code : '');
    setSelectedColorCode(productDetail.colors.length === 1 ? productDetail.colors[0].code : '');
  }

  async function handleRetry() {
    if (!productId) {
      return;
    }

    try {
      await loadProductDetail(productId);
    } catch (requestError) {
      if (requestError instanceof Error && requestError.message) {
        setError(requestError.message);
      } else {
        setError('No se pudo cargar el detalle del producto.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!productId) {
      setError('No se encontró el producto solicitado.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    void loadProductDetail(productId)
      .catch((requestError: unknown) => {
        if (!isMounted) {
          return;
        }

        if (requestError instanceof Error && requestError.message) {
          setError(requestError.message);
          return;
        }

        setError('No se pudo cargar el detalle del producto.');
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const canAddToCart = Boolean(
    product &&
      selectedStorageCode !== '' &&
      selectedColorCode !== '' &&
      !isAddingToCart,
  );

  async function handleAddToCart() {
    if (!product || selectedStorageCode === '' || selectedColorCode === '') {
      return;
    }

    setIsAddingToCart(true);
    setMessage(null);

    try {
      await addToCart({
        id: product.id,
        storageCode: selectedStorageCode,
        colorCode: selectedColorCode,
      });

      const selectedStorage = product.storages.find((storage) => storage.code === selectedStorageCode);
      const selectedColor = product.colors.find((color) => color.code === selectedColorCode);

      addCartItem({
        productId: product.id,
        brand: product.brand,
        model: product.model,
        imageUrl: product.imageUrl,
        priceLabel: product.price,
        unitPrice: parsePrice(product.price),
        storageCode: selectedStorageCode,
        storageName: selectedStorage?.name ?? String(selectedStorageCode),
        colorCode: selectedColorCode,
        colorName: selectedColor?.name ?? String(selectedColorCode),
      });

      openCart();
      setMessage('Producto añadido al carrito y visible en el sidebar.');
    } catch (requestError) {
      if (requestError instanceof Error && requestError.message) {
        setMessage(requestError.message);
      } else {
        setMessage('No se pudo añadir el producto al carrito.');
      }
    } finally {
      setIsAddingToCart(false);
    }
  }

  return (
    <section className="detail-section" aria-labelledby="product-detail-title">
      <Link className="back-link" to="/">
        ← Volver al listado
      </Link>

      {isLoading && <p className="detail-state">Cargando detalle...</p>}
      {!isLoading && error && (
        <div className="detail-state detail-state--error">
          <p>{error}</p>
          {productId && (
            <button type="button" onClick={() => void handleRetry()}>
              Reintentar
            </button>
          )}
        </div>
      )}

      {!isLoading && !error && product && (
        <div className="detail-layout">
          <div className="product-image-placeholder">
            <img src={product.imageUrl} alt={`${product.brand} ${product.model}`} />
          </div>

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
              {product.displayResolution && <li>Resolución: {product.displayResolution}</li>}
              {product.battery && <li>Batería: {product.battery}</li>}
              {product.primaryCamera && <li>Cámara principal: {product.primaryCamera}</li>}
              {product.secondaryCamera && <li>Cámara secundaria: {product.secondaryCamera}</li>}
              {product.dimensions && <li>Dimensiones: {product.dimensions}</li>}
              {product.weight && <li>Peso: {product.weight}</li>}
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
                {isAddingToCart ? 'Añadiendo...' : 'Añadir al carrito'}
              </button>
              {message && <p role="status">{message}</p>}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
