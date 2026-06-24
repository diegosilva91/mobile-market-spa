type CartCounterProps = {
  count: number;
};

export function CartCounter({ count }: CartCounterProps) {
  return (
    <div className="cart-counter" aria-label={`Productos en carrito: ${count}`}>
      <span aria-hidden="true">🛒</span>
      <span>{count}</span>
    </div>
  );
}
