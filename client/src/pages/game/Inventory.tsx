import React from 'react';

const Inventory: React.FC = () => {
  const items = [
    { id: 1, name: "Rusty Sword", type: "Weapon" },
    { id: 2, name: "Health Potion", type: "Consumable" }
  ];

  return (
    <div className="page-content">
      <h2>Your Satchel</h2>
      <div className="inventory-grid">
        {items.map(item => (
          <div key={item.id} className="item-slot">
            <div className="item-icon">📦</div>
            <p>{item.name}</p>
            <small>{item.type}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;