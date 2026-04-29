import { useState } from 'react';

export default function OrderDetail({ order, onClose, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    
    const success = await onDelete(order.id); 
    if (success) onClose();
    setDeleting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="card">
          <div className="card-header">
            <h3 style={{ margin: 0 }}>📋 Заказ #{order.id}</h3>
            <button className="btn btn-outline" onClick={onClose} disabled={deleting}>✕</button>
          </div>
          <dl className="order-grid">
            <dt>📤 Откуда</dt><dd>{order.senderCity}, {order.senderAddress}</dd>
            <dt>📥 Куда</dt><dd>{order.receiverCity}, {order.receiverAddress}</dd>
            <dt>⚖️ Вес</dt><dd>{order.cargoWeight} кг</dd>
            <dt>📅 Дата</dt><dd>{new Date(order.receiveDate).toLocaleDateString('ru-RU')}</dd>
          </dl>
          <hr />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={onClose} disabled={deleting}>Закрыть</button>
            <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? '⏳ Удаление...' : '🗑️ Удалить заказ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}