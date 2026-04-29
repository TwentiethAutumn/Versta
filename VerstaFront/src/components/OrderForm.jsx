import { useState } from 'react';
import { orderApi } from '../services/api';

export default function OrderForm({ onCreated }) {
  const [form, setForm] = useState({
    senderCity: '', senderAddress: '',
    receiverCity: '', receiverAddress: '',
    cargoWeight: '',
    receiveDate: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, cargoWeight: parseFloat(form.cargoWeight) };
      const createdOrder = await orderApi.create(payload);
      onCreated?.(createdOrder);
      
      setForm(prev => ({
        ...prev,
        senderCity: '', senderAddress: '',
        receiverCity: '', receiverAddress: '', cargoWeight: ''
      }));
    } catch (err) {
      alert('Ошибка: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Новый заказ</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="input-group"><label>Город отправки</label><input name="senderCity" value={form.senderCity} onChange={handleChange} required /></div>
          <div className="input-group"><label>Город получения</label><input name="receiverCity" value={form.receiverCity} onChange={handleChange} required /></div>
        </div>
        <div className="input-group"><label>Адрес отправки</label><input name="senderAddress" value={form.senderAddress} onChange={handleChange} required /></div>
        <div className="input-group"><label>Адрес получения</label><input name="receiverAddress" value={form.receiverAddress} onChange={handleChange} required /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="input-group"><label>Вес (кг)</label><input type="number" step="0.01" name="cargoWeight" value={form.cargoWeight} onChange={handleChange} required /></div>
          <div className="input-group"><label>Дата получения</label><input type="date" name="receiveDate" value={form.receiveDate} onChange={handleChange} required /></div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', marginTop: 8 }}>
          {submitting ? 'Создаю...' : 'Создать заказ'}
        </button>
      </form>
    </div>
  );
}