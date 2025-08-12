'use client';

import { useState, useEffect } from 'react';
import { db } from "@/lib/firebase-admin";
import { InventoryItem } from "@/types/commerce";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function InventoryAdmin() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [bulkData, setBulkData] = useState('');
  const [bulkPreview, setBulkPreview] = useState<Array<{
    sku: string;
    name: string;
    localName: string;
    price: number;
    priceUnit: string;
    stockQuantity: number;
    category: string;
    active: boolean;
  }>>([]);
  const [bulkErrors, setBulkErrors] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    localName: '',
    price: '',
    priceUnit: 'bunch',
    image: '',
    cultivar: '',
    healthBenefits: '',
    growingMethod: '',
    maturityTime: '',
    description: '',
    category: 'leafy-greens',
    active: true,
    stockQuantity: 0
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/inventory');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setProcessing(true);
      const response = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to add item');
      
      setShowAddModal(false);
      setFormData({
        sku: '', name: '', localName: '', price: '', priceUnit: 'bunch',
        image: '', cultivar: '', healthBenefits: '', growingMethod: '',
        maturityTime: '', description: '', category: 'leafy-greens',
        active: true, stockQuantity: 0
      });
      await fetchInventory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
    } finally {
      setProcessing(false);
    }
  };

  const handleEditItem = async () => {
    if (!selectedItem) return;
    
    try {
      setProcessing(true);
      const response = await fetch(`/api/admin/inventory/${selectedItem.sku}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to update item');
      
      setShowEditModal(false);
      setSelectedItem(null);
      await fetchInventory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setProcessing(false);
    }
  };

  const handleQuickStockAdjust = async (sku: string, adjustment: number) => {
    try {
      const response = await fetch(`/api/admin/inventory/${sku}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adjustment })
      });
      
      if (!response.ok) throw new Error('Failed to adjust stock');
      
      await fetchInventory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to adjust stock');
    }
  };

  const handleBulkPreview = () => {
    try {
      const lines = bulkData.trim().split('\n').filter(line => line.trim());
      const preview: Array<{
        sku: string;
        name: string;
        localName: string;
        price: number;
        priceUnit: string;
        stockQuantity: number;
        category: string;
        active: boolean;
      }> = [];
      const errors: string[] = [];
      
      lines.forEach((line, index) => {
        const columns = line.split(',').map(col => col.trim());
        if (columns.length < 6) {
          errors.push(`Line ${index + 1}: Insufficient columns (need at least 6)`);
          return;
        }
        
        const [sku, name, localName, price, priceUnit, stockQuantity, ...rest] = columns;
        const priceNum = parseFloat(price);
        
        if (!sku || !name || isNaN(priceNum)) {
          errors.push(`Line ${index + 1}: Invalid SKU, name, or price`);
          return;
        }
        
        preview.push({
          sku,
          name,
          localName: localName || name,
          price: priceNum,
          priceUnit: priceUnit || 'bunch',
          stockQuantity: parseInt(stockQuantity) || 0,
          category: rest[0] || 'leafy-greens',
          active: true
        });
      });
      
      setBulkPreview(preview);
      setBulkErrors(errors);
    } catch (err) {
      setBulkErrors(['Failed to parse bulk data']);
    }
  };

  const handleBulkImport = async () => {
    try {
      setProcessing(true);
      const response = await fetch('/api/admin/inventory/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: bulkPreview })
      });
      
      if (!response.ok) throw new Error('Failed to import items');
      
      setShowBulkModal(false);
      setBulkData('');
      setBulkPreview([]);
      setBulkErrors([]);
      await fetchInventory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import items');
    } finally {
      setProcessing(false);
    }
  };

  const openEditModal = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormData({
      sku: item.sku,
      name: item.name,
      localName: item.localName,
      price: item.price.toString(),
      priceUnit: item.priceUnit,
      image: item.image,
      cultivar: item.cultivar,
      healthBenefits: item.healthBenefits,
      growingMethod: item.growingMethod,
      maturityTime: item.maturityTime,
      description: item.description,
      category: item.category,
      active: item.active,
      stockQuantity: item.stockQuantity
    });
    setShowEditModal(true);
  };

    // Calculate summary stats
    const totalItems = items.length;
    const activeItems = items.filter(item => item.active).length;
    const lowStockItems = items.filter(item => item.stockQuantity <= 10 && item.stockQuantity > 0).length;
    const outOfStockItems = items.filter(item => item.stockQuantity === 0).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading inventory</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

    return (
      <div className="space-y-6">
        {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your product inventory and stock levels
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowBulkModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
            Bulk Import
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                    <dd className="text-lg font-medium text-gray-900">{totalItems}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Products</dt>
                    <dd className="text-lg font-medium text-gray-900">{activeItems}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Low Stock</dt>
                    <dd className="text-lg font-medium text-gray-900">{lowStockItems}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Out of Stock</dt>
                    <dd className="text-lg font-medium text-gray-900">{outOfStockItems}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Inventory</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Current stock levels and product information
            </p>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No inventory items</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Item
              </button>
            </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                  <tr key={item.sku} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={item.image} 
                              alt={item.name}
                            width={40}
                            height={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.localName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.price)} per {item.priceUnit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.stockQuantity > 10 
                            ? 'bg-green-100 text-green-800' 
                            : item.stockQuantity > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.stockQuantity} in stock
                        </span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleQuickStockAdjust(item.sku, 1)}
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Add 1 to stock"
                          >
                            <ArrowUpIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleQuickStockAdjust(item.sku, -1)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Remove 1 from stock"
                          >
                            <ArrowDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit item"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(`/products?sku=${item.sku}`, '_blank')}
                          className="text-blue-600 hover:text-blue-900"
                          title="View on website"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Item</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddItem(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Local Name</label>
                    <input
                      type="text"
                      value={formData.localName}
                      onChange={(e) => setFormData({...formData, localName: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unit</label>
                      <select
                        value={formData.priceUnit}
                        onChange={(e) => setFormData({...formData, priceUnit: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="bunch">Bunch</option>
                        <option value="lb">Pound</option>
                        <option value="jar">Jar</option>
                        <option value="piece">Piece</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({...formData, stockQuantity: parseInt(e.target.value) || 0})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="leafy-greens">Leafy Greens</option>
                      <option value="root-vegetables">Root Vegetables</option>
                      <option value="herbs">Herbs</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="honey">Honey</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({...formData, active: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active</label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? 'Adding...' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Item: {selectedItem.name}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleEditItem(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Local Name</label>
                    <input
                      type="text"
                      value={formData.localName}
                      onChange={(e) => setFormData({...formData, localName: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unit</label>
                      <select
                        value={formData.priceUnit}
                        onChange={(e) => setFormData({...formData, priceUnit: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="bunch">Bunch</option>
                        <option value="lb">Pound</option>
                        <option value="jar">Jar</option>
                        <option value="piece">Piece</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({...formData, stockQuantity: parseInt(e.target.value) || 0})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="leafy-greens">Leafy Greens</option>
                      <option value="root-vegetables">Root Vegetables</option>
                      <option value="herbs">Herbs</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="honey">Honey</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({...formData, active: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active</label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {processing ? 'Updating...' : 'Update Item'}
                  </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Import Inventory</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CSV Data (SKU, Name, Local Name, Price, Unit, Stock, Category)
                  </label>
                  <textarea
                    value={bulkData}
                    onChange={(e) => setBulkData(e.target.value)}
                    rows={10}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="FPUMPKIN-001,Fluted Pumpkin Leaves,Ugwu,5.00,bunch,50,leafy-greens&#10;CALLALOO-001,Callaloo - Amaranth,Efo Tete,5.00,bunch,40,leafy-greens"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleBulkPreview}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowBulkModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
      </div>

                {bulkErrors.length > 0 && (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <h4 className="text-sm font-medium text-red-800">Errors Found:</h4>
                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                      {bulkErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {bulkPreview.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <h4 className="text-sm font-medium text-green-800">
                      Preview ({bulkPreview.length} items to import):
                    </h4>
                    <div className="mt-2 max-h-60 overflow-y-auto">
                      <table className="min-w-full divide-y divide-green-200">
                        <thead className="bg-green-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-green-800">SKU</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-green-800">Name</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-green-800">Price</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-green-800">Stock</th>
                          </tr>
                        </thead>
                        <tbody className="bg-green-50 divide-y divide-green-200">
                          {bulkPreview.map((item, index) => (
                            <tr key={index}>
                              <td className="px-3 py-2 text-sm text-green-900">{item.sku}</td>
                              <td className="px-3 py-2 text-sm text-green-900">{item.name}</td>
                              <td className="px-3 py-2 text-sm text-green-900">${item.price} per {item.priceUnit}</td>
                              <td className="px-3 py-2 text-sm text-green-900">{item.stockQuantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleBulkImport}
                        disabled={processing || bulkErrors.length > 0}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                      >
                        {processing ? 'Importing...' : 'Confirm Import'}
                      </button>
                    </div>
                  </div>
                )}
          </div>
            </div>
          </div>
        </div>
      )}
      </div>
    );
}
