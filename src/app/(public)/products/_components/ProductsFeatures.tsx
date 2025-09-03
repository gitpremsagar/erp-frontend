'use client';

import { Shield, Truck, Package, Clock } from 'lucide-react';

export default function ProductsFeatures() {
  return (
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
  );
}
