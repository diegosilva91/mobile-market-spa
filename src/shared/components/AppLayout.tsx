import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import './AppLayout.css';

export function AppLayout() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="app-layout">
      <Header cartCount={cartCount} />
      <main className="app-main">
        <Outlet context={{ setCartCount }} />
      </main>
    </div>
  );
}
