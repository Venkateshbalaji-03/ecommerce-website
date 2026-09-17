import { useCart } from '../context/CartContext';

const truncateTitle = (title, limit = 10) => {
  const words = title.trim().split(/\s+/);
  return words.length <= limit ? title : `${words.slice(0, limit).join(' ')}...`;
};

function Products({ products = [], view }) {
  const { addToCart } = useCart();
  if (!products.length) return <div className="empty-state"><div>⌕</div><h2>No products found</h2><p>Try a different search.</p></div>;

  return <div className={`products ${view}`}>
    {products.map(item => (
      <article className="product-card" key={item.id}>
        <div className="product-image-wrap">
          <img src={item.image} className="img" alt={item.title} />
        </div>
        <div className="product-info">
          <span className="category">{item.category}</span>
          <h3>{truncateTitle(item.title)}</h3>
          <p className="product-price">$ {item.price.toFixed(2)}</p>
          <button className="add-to-cart" onClick={() => addToCart(item)}>🛒 Add to Cart</button>
        </div>
      </article>
    ))}
  </div>;
}
export default Products;
