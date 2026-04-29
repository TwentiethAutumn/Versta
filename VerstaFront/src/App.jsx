import { useState, useEffect, useCallback } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { orderApi } from './services/api';

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await orderApi.getAll();
      setOrders(data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleCreated = (newOrder) => {
    setOrders(prev => [...prev, newOrder]);
    showToast('Заказ успешно создан');
  };

  const handleDelete = async (id) => {
    try {
      await orderApi.delete(id);
      setOrders(prev => prev.filter(o => o.id !== id));
      showToast('Заказ удален');
      return true;
    } catch (err) {
      showToast('Ошибка: ' + (err.response?.data || err.message), 'error');
      return false;
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="container">
      <header><h1>🚚 Versta</h1></header>
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      <OrderForm onCreated={handleCreated} />
      <OrderList orders={orders} loading={loading} onDelete={handleDelete} />
    </div>
  );
}

export default App;