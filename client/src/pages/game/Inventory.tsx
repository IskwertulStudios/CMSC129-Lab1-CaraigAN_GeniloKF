import React, { useState, useMemo, useEffect } from 'react';
import './Inventory.css';

// --- Types ---
type EquipmentSlot = 'Weapon' | 'Head Wear' | 'Body Armor' | 'Pants';
type ItemType = EquipmentSlot | 'Consumable';
type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

interface Item {
  id: number;
  name: string;
  type: ItemType;
  level: number;
  rarity: Rarity;
  stat: string;
  flavorText: string;
}

// --- Initial Mock Data ---
const initialInventory: Item[] = [
  { id: 1, name: "Rusty Broadsword", type: "Weapon", level: 1, rarity: "Common", stat: "+2 ATK", flavorText: "It's seen better days, but the pointy end still hurts." },
  { id: 2, name: "Lesser Health Potion", type: "Consumable", level: 1, rarity: "Common", stat: "+50 HP", flavorText: "Tastes like cherry cough syrup, but it seals your wounds." },
  { id: 3, name: "Leather Tunic", type: "Body Armor", level: 2, rarity: "Uncommon", stat: "+5 DEF", flavorText: "Smells faintly of wet dog, but it turns a blade well enough." },
  { id: 4, name: "Iron Helm", type: "Head Wear", level: 3, rarity: "Rare", stat: "+8 DEF", flavorText: "Heavy, hard to see out of, but keeps your skull intact." },
  { id: 5, name: "Tattered Breeches", type: "Pants", level: 1, rarity: "Common", stat: "+1 DEF", flavorText: "A bit drafty in the back." },
  { id: 6, name: "Elixir of Strength", type: "Consumable", level: 5, rarity: "Epic", stat: "+10 STR (Temp)", flavorText: "Your veins bulge just looking at the bottle." }
];

const ITEMS_PER_PAGE = 5;

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<Item[]>(initialInventory);
  const [equipped, setEquipped] = useState<Record<EquipmentSlot, Item | null>>({
    'Weapon': null, 'Head Wear': null, 'Body Armor': null, 'Pants': null,
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // --- Filter & Sort State ---
  const [filterType, setFilterType] = useState<ItemType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'level' | 'rarity'>('level');
  const [currentPage, setCurrentPage] = useState(1);

  // --- Sorting & Filtering Logic ---
  const processedItems = useMemo(() => {
    let result = [...inventory];

    // Filter
    if (filterType !== 'All') {
      result = result.filter(item => item.type === filterType);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'level') return b.level - a.level; // Highest level first
      
      const rarityWeight: Record<Rarity, number> = { 
        Legendary: 5, Epic: 4, Rare: 3, Uncommon: 2, Common: 1 
      };
      return rarityWeight[b.rarity] - rarityWeight[a.rarity]; // Highest rarity first
    });

    return result;
  }, [inventory, filterType, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(processedItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = processedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 if filters change and current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);


  // --- Actions ---
  const equipItem = (item: Item, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'Consumable') return;
    const slot = item.type as EquipmentSlot;
    const currentlyEquipped = equipped[slot];
    setEquipped(prev => ({ ...prev, [slot]: item }));
    setInventory(prev => {
      const filtered = prev.filter(i => i.id !== item.id);
      return currentlyEquipped ? [...filtered, currentlyEquipped] : filtered;
    });
  };

  const unequipItem = (slot: EquipmentSlot) => {
    const item = equipped[slot];
    if (item) {
      setInventory(prev => [...prev, item]);
      setEquipped(prev => ({ ...prev, [slot]: null }));
    }
  };

  const useItem = (item: Item, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`You used: ${item.name}!`);
    setInventory(prev => prev.filter(i => i.id !== item.id));
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  return (
    <div className="inventory-page">
      {/* LEFT PANEL */}
      <div className="equipment-section">
        <h2>Character</h2>
        <div className="equip-grid">
          {(Object.keys(equipped) as EquipmentSlot[]).map(slot => (
            <div key={slot} className="equip-slot">
              <div className="equip-slot-label">{slot}</div>
              {equipped[slot] ? (
                <div>
                  <strong>{equipped[slot]?.name}</strong>
                  <div className="stat-text">{equipped[slot]?.stat}</div>
                  <button onClick={() => unequipItem(slot)} style={{ marginTop: '0.5rem' }}>
                    Unequip
                  </button>
                </div>
              ) : (
                <div style={{ color: 'var(--border-color)', fontStyle: 'italic' }}>Empty Slot</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="inventory-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Satchel</h2>
          
          {/* Controls */}
          <div className="inventory-controls">
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value as ItemType | 'All')}
            >
              <option value="All">All Types</option>
              <option value="Weapon">Weapons</option>
              <option value="Head Wear">Head Wear</option>
              <option value="Body Armor">Body Armor</option>
              <option value="Pants">Pants</option>
              <option value="Consumable">Consumables</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'level' | 'rarity')}
            >
              <option value="level">Sort: Lvl</option>
              <option value="rarity">Sort: Rarity</option>
            </select>
          </div>
        </div>

        <div className="inventory-list">
          <div className="list-header">
            <div style={{ flex: 1.5, textAlign: 'left' }}>Item Name</div>
            <div style={{ flex: 1 }}>Type</div>
            <div style={{ flex: 1 }}>Lvl</div>
            <div style={{ flex: 1 }}>Rarity</div>
            <div style={{ flex: 1 }}>Stat</div>
            <div style={{ flex: 1 }}>Action</div>
          </div>

          <div className="items-container">
            {paginatedItems.map(item => (
              <div key={item.id} className="inventory-row" onClick={() => setSelectedItem(item)}>
                <div style={{ flex: 1.5, fontWeight: 'bold', textAlign: 'left' }}>{item.name}</div>
                <div style={{ flex: 1, color: 'var(--text-muted)' }}>{item.type}</div>
                <div style={{ flex: 1 }}>{item.level}</div>
                <div style={{ flex: 1, color: `var(--${item.rarity.toLowerCase()})` }}>{item.rarity}</div>
                <div style={{ flex: 1 }} className="stat-text">{item.stat}</div>
                <div style={{ flex: 1}}>
                  {item.type === 'Consumable' ? (
                    <button onClick={(e) => useItem(item, e)}>Use</button>
                  ) : (
                    <button onClick={(e) => equipItem(item, e)}>Equip</button>
                  )}
                </div>
              </div>
            ))}
            
            {paginatedItems.length === 0 && (
              <div className="empty-message">No items found.</div>
            )}
          </div>

          {/* Pagination Nav */}
          <div className="page-nav">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: `var(--${selectedItem.rarity.toLowerCase()})` }}>{selectedItem.name}</h2>
            <p className="flavor-text">"{selectedItem.flavorText}"</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>{selectedItem.type}</span>
              <span>{selectedItem.rarity}</span>
            </div>
            <button 
              onClick={() => setSelectedItem(null)} 
              style={{ marginTop: '2rem', width: '100%', padding: '0.8rem' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;