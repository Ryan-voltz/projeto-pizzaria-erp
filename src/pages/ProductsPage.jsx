import React, { useState } from 'react';
import ProductsHeader from '../components/products/ProductsHeader';
import ProductsTable from '../components/products/ProductsTable';
import ProductModal from '../components/products/ProductModal';
import CategoryManagerModal from '../components/products/CategoryManagerModal';
import { initialProducts, initialCategories } from '../data/mockData';

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const activeCount = products.filter((p) => p.status === 'Ativo').length;

  // Product Actions
  const handleOpenNewProduct = () => {
    setProductToEdit(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (productToEdit) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? { ...p, ...productData } : p))
      );
    } else {
      setProducts((prev) => [productData, ...prev]);
    }
  };

  const handleToggleStatus = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, status: p.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : p
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto do catálogo?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  // Category Actions
  const handleSaveCategory = (categoryData) => {
    setCategories((prev) => {
      const exists = prev.find((c) => c.id === categoryData.id);
      if (exists) {
        return prev.map((c) => (c.id === categoryData.id ? categoryData : c));
      }
      return [...prev, categoryData];
    });
  };

  const handleDeleteCategory = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;
    const hasProducts = products.some((p) => p.category === cat.name);
    if (hasProducts) {
      alert(`Não é possível excluir a categoria "${cat.name}" pois existem produtos associados a ela.`);
      return;
    }
    if (window.confirm(`Deseja excluir a categoria "${cat.name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
      if (selectedCategory === cat.name) {
        setSelectedCategory('all');
      }
    }
  };

  const handleToggleCategoryStatus = (categoryId) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, status: c.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : c
      )
    );
  };

  return (
    <div className="space-y-5">
      {/* Header with Search and Category filters */}
      <ProductsHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
        totalProducts={products.length}
        activeCount={activeCount}
        onOpenNewProduct={handleOpenNewProduct}
        onOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
      />

      {/* Products Table */}
      <ProductsTable
        products={filteredProducts}
        onEditProduct={handleEditProduct}
        onToggleStatus={handleToggleStatus}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Product Modal (Create / Edit) */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
        categories={categories.filter((c) => c.status === 'Ativo')}
        onSave={handleSaveProduct}
      />

      {/* Categories Manager Modal */}
      <CategoryManagerModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        categories={categories}
        onSaveCategory={handleSaveCategory}
        onDeleteCategory={handleDeleteCategory}
        onToggleCategoryStatus={handleToggleCategoryStatus}
      />
    </div>
  );
}
