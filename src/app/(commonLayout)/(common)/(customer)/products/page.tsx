'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  // Filter, 
  Star, 
  ShoppingCart, 
  Heart,
  Package,
  Truck,
  Clock,
  Shield
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  mrp: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const dummyProducts: Product[] = [
    {
      id: 1,
      name: 'Haldiram Namkeen Mix',
      category: 'Namkeen',
      mrp: 45.99,
      originalPrice: 59.99,
      image: '/namkeen-mix.jpg',
      description: 'Traditional savory snacks mix with premium quality ingredients',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      isNew: true,
      isFeatured: true
    },
    {
      id: 2,
      name: 'Haldiram Sweets Assortment',
      category: 'Sweets',
      mrp: 89.99,
      originalPrice: 119.99,
      image: '/sweets.jpg',
      description: 'Premium quality Indian sweets assortment',
      rating: 4.8,
      reviews: 95,
      inStock: true,
      isFeatured: true
    },
    {
      id: 3,
      name: 'Haldiram Papad Variety Pack',
      category: 'Papad',
      mrp: 35.50,
      image: '/papad.jpg',
      description: 'Crispy papad varieties - perfect for any meal',
      rating: 4.3,
      reviews: 67,
      inStock: true
    },
    {
      id: 4,
      name: 'Haldiram Ready-to-Eat Dal Khichdi',
      category: 'Ready-to-Eat',
      mrp: 25.99,
      image: '/ready-to-eat.jpg',
      description: 'Convenient and delicious dal khichdi ready in minutes',
      rating: 4.2,
      reviews: 43,
      inStock: true
    },
    {
      id: 5,
      name: 'Haldiram Aloo Bhujia',
      category: 'Namkeen',
      mrp: 32.99,
      image: '/aloo-bhujia.jpg',
      description: 'Crispy potato-based namkeen with authentic spices',
      rating: 4.6,
      reviews: 156,
      inStock: true
    },
    {
      id: 6,
      name: 'Haldiram Rasgulla',
      category: 'Sweets',
      mrp: 55.99,
      image: '/rasgulla.jpg',
      description: 'Soft and spongy rasgulla in sugar syrup',
      rating: 4.7,
      reviews: 89,
      inStock: false
    },
    {
      id: 7,
      name: 'Haldiram Moong Dal Papad',
      category: 'Papad',
      mrp: 28.50,
      image: '/moong-papad.jpg',
      description: 'Healthy moong dal papad with traditional taste',
      rating: 4.1,
      reviews: 34,
      inStock: true
    },
    {
      id: 8,
      name: 'Haldiram Paneer Curry',
      category: 'Ready-to-Eat',
      mrp: 42.99,
      image: '/paneer-curry.jpg',
      description: 'Rich and creamy paneer curry ready to serve',
      rating: 4.4,
      reviews: 52,
      inStock: true,
      isNew: true
    },
    {
      id: 9,
      name: 'Haldiram Chana Dal Namkeen',
      category: 'Namkeen',
      mrp: 38.99,
      image: '/chana-dal.jpg',
      description: 'Crunchy chana dal namkeen with perfect seasoning',
      rating: 4.3,
      reviews: 78,
      inStock: true
    },
    {
      id: 10,
      name: 'Haldiram Gulab Jamun',
      category: 'Sweets',
      mrp: 65.99,
      image: '/gulab-jamun.jpg',
      description: 'Soft and sweet gulab jamun in rose-flavored syrup',
      rating: 4.9,
      reviews: 112,
      inStock: true,
      isFeatured: true
    },
    {
      id: 11,
      name: 'Haldiram Urad Dal Papad',
      category: 'Papad',
      mrp: 31.50,
      image: '/urad-papad.jpg',
      description: 'Traditional urad dal papad with authentic taste',
      rating: 4.0,
      reviews: 29,
      inStock: true
    },
    {
      id: 12,
      name: 'Haldiram Vegetable Biryani',
      category: 'Ready-to-Eat',
      mrp: 48.99,
      image: '/biryani.jpg',
      description: 'Aromatic vegetable biryani with authentic spices',
      rating: 4.5,
      reviews: 61,
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'namkeen', name: 'Namkeen' },
    { id: 'sweets', name: 'Sweets' },
    { id: 'papad', name: 'Papad' },
    { id: 'ready-to-eat', name: 'Ready-to-Eat' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' }
  ];

  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.mrp - b.mrp;
      case 'price-high':
        return b.mrp - a.mrp;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-400/50 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-gray-600 mt-1">Discover our premium Haldiram product range</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <Package className="w-16 h-16 text-primary" />
                  </div>
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </div>
                  )}
                  {product.isFeatured && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {Math.round(((product.originalPrice - product.mrp) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-4">
                    {product.inStock ? (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        In Stock
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      disabled={!product.inStock}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {dummyProducts.length} products
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Products?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">All products meet Haldiram&apos;s strict quality standards</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick and efficient delivery across the region</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Genuine Products</h3>
              <p className="text-sm text-gray-600">100% authentic Haldiram products with warranty</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round the clock customer support for your queries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
