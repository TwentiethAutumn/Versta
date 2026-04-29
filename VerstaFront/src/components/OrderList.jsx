import { useState } from 'react';
import OrderDetail from './OrderDetail';

export default function OrderList({ orders, loading, onDelete }) {
  const [selected, setSelected] = useState(null);

  if (loading) return <div className="card empty-state">⏳ Загрузка...</div>;
  if (!orders?.length) return <div className="card empty-state">📭 Заказов нет</div>;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>📦 Список заказов</h2>
          <span className="badge">{orders.length} шт.</span>
        </div>
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card" onClick={() => setSelected(order)}>
              <div className="order-card-header">
                <span className="order-id">#{order.id}</span>
                <button className="btn btn-danger btn-sm" onClick={e => { e.stopPropagation(); onDelete(order.id); }}>🗑️</button>
              </div>
              <div className="order-route">{order.senderCity} → {order.receiverCity}</div>
              <div className="order-meta">⚖️ {order.cargoWeight} кг • 📅 {new Date(order.receiveDate).toLocaleDateString('ru-RU')}</div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <OrderDetail order={selected} onClose={() => setSelected(null)} onDelete={onDelete} />
      )}
    </>
  );
}