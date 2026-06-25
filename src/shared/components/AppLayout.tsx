import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import './AppLayout.css';

export function AppLayout() {
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    const rawCount = window.localStorage.getItem('cart:count:v1');
    const parsedCount = Number(rawCount);

    return Number.isFinite(parsedCount) && parsedCount >= 0 ? parsedCount : 0;
  });

  useEffect(() => {
    window.localStorage.setItem('cart:count:v1', String(cartCount));
  }, [cartCount]);

  return (
    <div className="app-layout">
      <Header cartCount={cartCount} />
      <main className="app-main">
        <Outlet context={{ setCartCount }} />
      </main>
    </div>
  );
}
