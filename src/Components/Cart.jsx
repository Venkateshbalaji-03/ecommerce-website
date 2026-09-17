import { useCart } from '../context/CartContext';

function Cart({ onClose }) {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  return <div className="cart-overlay" onClick={onClose}>
    <aside className="cart-panel" onClick={e => e.stopPropagation()}>
      <div className="cart-header"><div><h2>Your Cart</h2><p>{cart.length} product{cart.length !== 1 ? 's' : ''}</p></div><button onClick={onClose} className="close-cart">×</button></div>
      {cart.length === 0 ? <div className="cart-empty"><div>🛒</div><h3>Your cart is empty</h3><p>Add some products to get started.</p><button onClick={onClose}>Continue Shopping</button></div> : <>
        <div className="cart-items">
          {cart.map(item => <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info"><h3>{item.title}</h3><p>$ {item.price.toFixed(2)}</p>
              <div className="quantity"><button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>−</button><span>{item.quantity}</span><button onClick={() => increaseQuantity(item.id)}>+</button></div>
            </div>
            <button className="delete-btn" onClick={() => removeFromCart(item.id)} title="Delete">🗑</button>
          </div>)}
        </div>
        <div className="cart-footer"><div><span>Total</span><strong>$ {totalPrice.toFixed(2)}</strong></div><button className="clear-cart" onClick={clearCart}>Clear Cart</button><button className="checkout-btn">Checkout</button></div>
      </>}
    </aside>
  </div>;
}
export default Cart;
