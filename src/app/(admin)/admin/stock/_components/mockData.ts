export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  sku: string;
  stock: number;
  price: number;
  status: string;
  lastUpdated: string;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: 'Haldiram Namkeen Mix',
    category: 'Namkeen',
    sku: 'HAL-NAM-001',
    stock: 150,
    price: 45.99,
    status: 'In Stock',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    name: 'Haldiram Sweets Assortment',
    category: 'Sweets',
    sku: 'HAL-SWE-001',
    stock: 25,
    price: 89.99,
    status: 'Low Stock',
    lastUpdated: '2024-01-14'
  },
  {
    id: 3,
    name: 'Haldiram Papad Variety Pack',
    category: 'Papad',
    sku: 'HAL-PAP-001',
    stock: 200,
    price: 35.50,
    status: 'In Stock',
    lastUpdated: '2024-01-13'
  },
  {
    id: 4,
    name: 'Haldiram Ready-to-Eat Dal Khichdi',
    category: 'Ready-to-Eat',
    sku: 'HAL-RTE-001',
    stock: 0,
    price: 25.99,
    status: 'Out of Stock',
    lastUpdated: '2024-01-12'
  }
];
