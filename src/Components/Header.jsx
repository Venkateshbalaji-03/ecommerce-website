import { useCart } from '../context/CartContext';

function Header({ setView, view, search, setSearch, theme, setTheme, onCartClick }) {
  const { totalItems } = useCart();
  return (
    <header className="navbar">
      <div className="brand">Shoppify.</div>

      <div className="search-box">
        <span aria-hidden="true">⌕</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" />
        {search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
      </div>

      <div className="header-actions">
        <div className="view-toggle" aria-label="Product view">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid view">▦</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List view">☰</button>
          <button className={view === 'uncommon' ? 'active' : ''} onClick={() => setView('uncommon')} title="Masonry view">▥</button>
        </div>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
          {theme === 'light' ? '☾' : '☀'}
        </button>
        <button className="cart-button" onClick={onCartClick}>🛒 <span>Cart</span> <b>{totalItems}</b></button>
      </div>
    </header>
  );
}
export default Header;
