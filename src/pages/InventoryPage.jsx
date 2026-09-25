import React, { useState } from 'react';
import InventoryHeader from '../components/inventory/InventoryHeader';
import InventoryTable from '../components/inventory/InventoryTable';
import MovementsHistoryTable from '../components/inventory/MovementsHistoryTable';
import StockMovementModal from '../components/inventory/StockMovementModal';
import { initialProducts, initialStockMovements } from '../data/mockData';

export default function InventoryPage({ onNavigateToShoppingList }) {
  const [products, setProducts] = useState(initialProducts);
  const [movements, setMovements] = useState(initialStockMovements);
  const [activeTab, setActiveTab] = useState('stock'); // 'stock' | 'movements'

  // Modal state
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [productForMovement, setProductForMovement] = useState(null);

  // KPIs
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock <= p.minStock && p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.stock * p.cost), 0);

  const handleOpenMovementModal = (product = null) => {
    setProductForMovement(product);
    setIsMovementModalOpen(true);
  };

  const handleSaveMovement = (movementData) => {
    // 1. Add to movements list
    setMovements((prev) => [movementData, ...prev]);

    // 2. Update product stock and lastMovement
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === movementData.productId) {
          return {
            ...p,
            stock: movementData.newStock,
            lastMovement: 'Hoje, agora'
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-5">
      {/* Header with KPIs, Tabs and Actions */}
      <InventoryHeader
        totalProducts={totalProducts}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
        totalStockValue={totalStockValue}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMovementModal={() => handleOpenMovementModal(null)}
        onNavigateToShoppingList={onNavigateToShoppingList}
      />

      {/* Content depending on active tab */}
      {activeTab === 'stock' ? (
        <InventoryTable
          products={products}
          onQuickMovement={(product) => handleOpenMovementModal(product)}
        />
      ) : (
        <MovementsHistoryTable movements={movements} />
      )}

      {/* Movement Modal */}
      <StockMovementModal
        isOpen={isMovementModalOpen}
        onClose={() => setIsMovementModalOpen(false)}
        products={products}
        preselectedProduct={productForMovement}
        onSaveMovement={handleSaveMovement}
      />
    </div>
  );
}
