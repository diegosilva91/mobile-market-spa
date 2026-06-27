type CartCounterProps = {
  count: number;
  isOpen: boolean;
  onClick: () => void;
};

export function CartCounter({ count, isOpen, onClick }: CartCounterProps) {
  return (
    <button
      className="cart-counter"
      type="button"
      aria-label={`Productos en carrito: ${count}`}
      aria-expanded={isOpen}
      aria-controls="cart-sidebar"
      onClick={onClick}
    >
      <span aria-hidden="true">🛒</span>
      <span>{count}</span>
    </button>
  );
}
