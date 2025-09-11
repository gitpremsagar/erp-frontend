'use client';

import { useEffect, useState } from 'react';

import AdminSidebar from "../_components/AdminSidebar";
import StocksHeader from "@/app/(protected)/(admin)/admin/stock/_components/StocksHeader";
import StocksTable from "@/app/(protected)/(admin)/admin/stock/_components/StocksTable";
import StockLoading from "@/app/(protected)/(admin)/admin/stock/_components/StockLoading";
import StockError from "@/app/(protected)/(admin)/admin/stock/_components/StockError";
import { Product } from "@/lib/types/products/Product.type";
import { productServices } from "@/lib/services/productServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newStock, setNewStock] = useState<number>(0);

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

  const handleUpdateStock = (product: Product) => {
    setSelectedProduct(product);
    setNewStock(product.Stock[0]?.stockQuantity || 0);
    setIsUpdateDialogOpen(true);
  };

  const handleStockUpdate = async () => {
    if (!selectedProduct || newStock < 0) return;

    try {
      // Call API to update stock
      const updatedStock = {
        ...selectedProduct.Stock[0],
        stockQuantity: newStock
      };
      await productServices.updateProduct(selectedProduct.id, { 
        Stock: [updatedStock] 
      });
      
      // Update local state after successful API call
      const updatedProducts = products.map(product =>
        product.id === selectedProduct.id
          ? { 
              ...product, 
              Stock: [{ 
                ...product.Stock[0], 
                stockQuantity: newStock 
              }] 
            }
          : product
      );
      
      setProducts(updatedProducts);
      setIsUpdateDialogOpen(false);
      setSelectedProduct(null);
      toast.success(`Stock updated for ${selectedProduct.name}`);
    } catch (err) {
      console.error('Error updating stock:', err);
      toast.error('Failed to update stock');
    }
  };

  if (loading) {
    return <StockLoading />;
  }

  if (error) {
    return <StockError error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StocksHeader />
            <StocksTable data={products} onUpdateStock={handleUpdateStock} />
          </div>
        </div>
      </div>

      {/* Update Stock Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock - {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentStock">Current Stock</Label>
              <Input
                id="currentStock"
                value={selectedProduct?.Stock[0]?.stockQuantity || 0}
                disabled
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="newStock">New Stock</Label>
              <Input
                id="newStock"
                type="number"
                min="0"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
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
              <Button onClick={handleStockUpdate}>
                Update Stock
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


