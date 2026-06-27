import { Link, useLocation } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';
import { CartCounter } from './CartCounter';
import './Header.css';

type HeaderProps = {
  cartCount: number;
  isCartOpen: boolean;
  onCartClick: () => void;
};

export function Header({ cartCount, isCartOpen, onCartClick }: HeaderProps) {
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <div className="site-header__content">
        <Link className="site-header__brand" to="/" aria-label="Ir al listado de productos">
          <span className="site-header__brand-mark">MM</span>
          <span>Mobile Market</span>
        </Link>

        <Breadcrumbs pathname={pathname} />

        <CartCounter count={cartCount} isOpen={isCartOpen} onClick={onCartClick} />
      </div>
    </header>
  );
}
