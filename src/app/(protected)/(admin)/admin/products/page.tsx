'use client';

import { useEffect, useState } from 'react';
import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import ProductsHeader from "./_components/ProductsHeader";
import ProductsTable from "./_components/ProductsTable";
import ProductsLoading from "./_components/ProductsLoading";
import ProductsError from "./_components/ProductsError";
import { ApiProduct } from "@/lib/types/products/ApiProductsResponse.type";
import { productServices } from "@/lib/services/productServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: '',
    description: '',
    mrp: 0,
    lowStockLimit: 0,
    overStockLimit: 0,
    expiryAlertDays: 0
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products with a high limit to show on one page
        const response = await productServices.getProducts({ limit: 1000 });
        setProducts(response.products);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again.');
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateProduct = (product: ApiProduct) => {
    setSelectedProduct(product);
    setUpdateData({
      name: product.name,
      description: product.description,
      mrp: product.mrp,
      lowStockLimit: product.lowStockLimit,
      overStockLimit: product.overStockLimit,
      expiryAlertDays: product.expiryAlertDays
    });
    setIsUpdateDialogOpen(true);
  };

  const handleProductUpdate = async () => {
    if (!selectedProduct) return;

    try {
      // Call API to update product
      await productServices.updateProduct(selectedProduct.id, updateData);
      
      // Update local state after successful API call
      const updatedProducts = products.map(product =>
        product.id === selectedProduct.id
          ? { ...product, ...updateData }
          : product
      );
      
      setProducts(updatedProducts);
      setIsUpdateDialogOpen(false);
      setSelectedProduct(null);
      toast.success(`Product updated: ${updateData.name}`);
    } catch (err) {
      console.error('Error updating product:', err);
      toast.error('Failed to update product');
    }
  };

  if (loading) {
    return <ProductsLoading />;
  }

  if (error) {
    return <ProductsError error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProductsHeader />
            <ProductsTable data={products} onUpdateProduct={handleUpdateProduct} />
          </div>
        </div>
      </div>

      {/* Update Product Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product - {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={updateData.name}
                onChange={(e) => setUpdateData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={updateData.description}
                onChange={(e) => setUpdateData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mrp">MRP</Label>
              <Input
                id="mrp"
                type="number"
                min="0"
                value={updateData.mrp}
                onChange={(e) => setUpdateData(prev => ({ ...prev, mrp: Number(e.target.value) }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lowStockLimit">Low Stock Limit</Label>
              <Input
                id="lowStockLimit"
                type="number"
                min="0"
                value={updateData.lowStockLimit}
                onChange={(e) => setUpdateData(prev => ({ ...prev, lowStockLimit: Number(e.target.value) }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="overStockLimit">Over Stock Limit</Label>
              <Input
                id="overStockLimit"
                type="number"
                min="0"
                value={updateData.overStockLimit}
                onChange={(e) => setUpdateData(prev => ({ ...prev, overStockLimit: Number(e.target.value) }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="expiryAlertDays">Expiry Alert Days</Label>
              <Input
                id="expiryAlertDays"
                type="number"
                min="0"
                value={updateData.expiryAlertDays}
                onChange={(e) => setUpdateData(prev => ({ ...prev, expiryAlertDays: Number(e.target.value) }))}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsUpdateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleProductUpdate}>
                Update Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
