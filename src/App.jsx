import { useEffect, useMemo, useState } from 'react';
import Header from './Components/Header';
import Products from './Components/Products';
import Cart from './Components/Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [view, setView] = useState(() => localStorage.getItem('view') || 'grid');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => { if (!res.ok) throw new Error('Failed to load products'); return res.json(); })
      .then(data => setProducts(data))
      .catch(() => setError('Unable to load products. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => localStorage.setItem('view', view), [view]);
  useEffect(() => { localStorage.setItem('theme', theme); document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { setCurrentPage(1); }, [search, itemsPerPage]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter(item => `${item.title} ${item.category}`.toLowerCase().includes(term));
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = itemsPerPage === filteredProducts.length
    ? filteredProducts
    : filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const showAll = () => {
    if (itemsPerPage === filteredProducts.length) setItemsPerPage(10);
    else setItemsPerPage(filteredProducts.length || 10);
    setCurrentPage(1);
  };

  return <div className="app-shell">
    <Header {...{ view, setView, search, setSearch, theme, setTheme }} onCartClick={() => setCartOpen(true)} />
    <main>
      {loading ? <div className="loading"><div className="spinner"/><p>Loading products...</p></div> : error ? <div className="error-state">{error}</div> : <Products products={currentProducts} view={view} />}
    </main>
    {!loading && !error && filteredProducts.length > 0 && <footer className="footer-section">
      <div className="pagination">
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1 || itemsPerPage === filteredProducts.length}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => <button key={i} className={currentPage === i + 1 ? 'current' : ''} onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={itemsPerPage === filteredProducts.length}>{i + 1}</button>)}
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages || itemsPerPage === filteredProducts.length}>Next</button>
        <button className="show-all" onClick={showAll}>{itemsPerPage === filteredProducts.length ? 'Show Less' : 'Show All'}</button>
      </div>
    </footer>}
    {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
  </div>;
}
export default App;
