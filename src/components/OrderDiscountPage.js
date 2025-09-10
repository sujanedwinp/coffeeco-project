import React, { useMemo, useState } from 'react';
import './OrderDiscountPage.css';
import './CoffeeReserveForm.css';

const ITEMS = [
  { id: 'espresso', name: 'Espresso', description: 'Strong and bold single shot', price: 120 },
  { id: 'americano', name: 'Americano', description: 'Espresso with hot water', price: 140 },
  { id: 'latte', name: 'Latte', description: 'Espresso with steamed milk', price: 180 },
  { id: 'cappuccino', name: 'Cappuccino', description: 'Rich foam and balanced taste', price: 190 },
  { id: 'mocha', name: 'Mocha', description: 'Chocolate flavored coffee', price: 210 },
  { id: 'flatwhite', name: 'Flat White', description: 'Velvety microfoam and espresso', price: 200 },
  { id: 'croissant', name: 'Croissant', description: 'Buttery flaky pastry', price: 90 },
  { id: 'muffin', name: 'Blueberry Muffin', description: 'Soft, sweet, and fruity', price: 80 },
];

function formatCurrency(value) {
  return `₹${value.toFixed(2)}`;
}

const OrderDiscountPage = () => {
  const [cart, setCart] = useState([]); // array of {id,name,price}
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  const discountAmount = useMemo(
    () => Math.min(Math.max(discountPercent, 0), 100) * subtotal / 100,
    [discountPercent, subtotal]
  );
  const total = useMemo(() => Math.max(subtotal - discountAmount, 0), [subtotal, discountAmount]);

  const handleAdd = (item) => {
    setCart((prev) => [...prev, { id: `${item.id}-${prev.length + 1}` , name: item.name, price: item.price }]);
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleConfirm = () => {
    if (cart.length === 0) {
      alert('Please add at least one item to confirm your order.');
      return;
    }
    const itemsSummary = cart.map(i => `${i.name} - ${formatCurrency(i.price)}`).join('\n');
    alert(`Order Confirmed!\n\nItems:\n${itemsSummary}\n\nSubtotal: ${formatCurrency(subtotal)}\nDiscount (${Math.min(Math.max(discountPercent, 0), 100)}%): -${formatCurrency(discountAmount)}\nTotal: ${formatCurrency(total)}`);
    setCart([]);
    setDiscountPercent(0);
  };

  return (
    <main className="main">
      <div className="form-bg">
        <header className="center brown-color">
          <h1>Order</h1>
        </header>

        <div className="order-grid">
          <section className="items-panel">
            <h2 className="panel-title horizon-align">Items</h2>
            <div className="items-scroll scroll-hidden">
              {ITEMS.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-row">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">{formatCurrency(item.price)}</div>
                  </div>
                  <div className="item-separator" />
                  <div className="item-actions">
                    <div className="item-desc">{item.description}</div>
                    <button className="submit-btn add-btn" onClick={() => handleAdd(item)}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="divider" />

          <section className="billing-panel">
            <h2 className="panel-title horizon-align">Billing of each</h2>
            <div className="billing-scroll scroll-hidden">
              {cart.length === 0 && (
                <div className="empty-state">Nothing here yet. Add some items →</div>
              )}
              {cart.map((entry) => (
                <div key={entry.id} className="bill-row">
                  <div className="bill-name">{entry.name}</div>
                  <div className="bill-right">
                    <div className="bill-price">{formatCurrency(entry.price)}</div>
                    <button className="remove-btn" onClick={() => handleRemove(entry.id)}>×</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="discount-row">
              <div className="discount-label">Discount</div>
              <div className="discount-input-wrap">
                <input
                  className="discount-input"
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                />
                <span className="discount-suffix">%</span>
              </div>
            </div>

            <div className="total-row">
              <div className="total-left">
                <div>Subtotal</div>
                <div className="muted">After discount</div>
              </div>
              <div className="total-right">
                <div className="subtotal">{formatCurrency(subtotal)}</div>
                <div className="grandtotal">{formatCurrency(total)}</div>
              </div>
            </div>

            <div className="confirm-wrap">
              <button className="submit-btn confirm-btn" onClick={handleConfirm}>Confirm Order</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default OrderDiscountPage;
