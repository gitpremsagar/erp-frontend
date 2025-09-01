export interface ProductRow {
  id: string;
  name: string;
  mrp: number;
  productCode: string;
  description: string;
  expiryDate: string;
  validity: string;
  quantity: number;
  tags: string[];
  imageUrl: string;
  category: string;
  group: string;
  subCategory: string;
  grammage: string;
}

export const productsData: ProductRow[] = [
  {
    id: '671f1a2c0000000000000001',
    name: 'Paracetamol 500mg',
    mrp: 25,
    productCode: 'PRD-0001',
    description: 'Pain reliever and fever reducer',
    expiryDate: '2026-03-31',
    validity: '36M',
    quantity: 124,
    tags: ['OTC', 'Analgesic'],
    imageUrl: '/window.svg',
    category: 'Medicine',
    group: 'Analgesics',
    subCategory: 'Paracetamol',
    grammage: '500mg',
  },
  {
    id: '671f1a2c0000000000000002',
    name: 'Amoxicillin 250mg',
    mrp: 85,
    productCode: 'PRD-0002',
    description: 'Antibiotic capsule',
    expiryDate: '2025-11-30',
    validity: '24M',
    quantity: 42,
    tags: ['Rx', 'Antibiotic'],
    imageUrl: '/window.svg',
    category: 'Medicine',
    group: 'Antibiotics',
    subCategory: 'Penicillins',
    grammage: '250mg',
  },
  {
    id: '671f1a2c0000000000000003',
    name: 'Vitamin C Chewable',
    mrp: 150,
    productCode: 'PRD-0003',
    description: 'Immunity booster tablets',
    expiryDate: '2027-01-15',
    validity: '48M',
    quantity: 300,
    tags: ['OTC', 'Supplement'],
    imageUrl: '/window.svg',
    category: 'Supplements',
    group: 'Vitamins',
    subCategory: 'Vitamin C',
    grammage: '1000mg',
  },
];


