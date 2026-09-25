import React, { useState } from 'react';
import CustomersHeader from '../components/customers/CustomersHeader';
import CustomersTable from '../components/customers/CustomersTable';
import CustomerProfileDrawer from '../components/customers/CustomerProfileDrawer';
import { initialCustomers } from '../data/mockData';

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.address && c.address.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;

    return matchesSearch && matchesTier;
  });

  const vipCount = customers.filter((c) => c.tier === 'VIP').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <CustomersHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tierFilter={tierFilter}
        onSelectTier={setTierFilter}
        totalCustomers={customers.length}
        vipCount={vipCount}
      />

      {/* Customers Table */}
      <CustomersTable
        customers={filteredCustomers}
        onSelectCustomer={(c) => setSelectedCustomer(c)}
      />

      {/* Profile Drawer */}
      <CustomerProfileDrawer
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}
