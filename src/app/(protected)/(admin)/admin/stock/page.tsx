'use client';

import { useEffect, useState, useMemo } from 'react';

import AdminSidebar from "../_components/AdminSidebar";
import { 
  StocksHeader, 
  StocksTable, 
  StockLoading, 
  StockError, 
  StocksFilterAndActions 
} from "@/app/(protected)/(admin)/admin/stock/_components";
import { Product } from "@/lib/types/products/Product.type";
import { productServices } from "@/lib/services/productServices";
import { useCategories } from "@/hooks/categories";
import { useProductTags } from "@/hooks/productTags";
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
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStockLevel, setSelectedStockLevel] = useState('all');
  
  // Hooks for categories and tags
  const { categories } = useCategories();
  const { productTags } = useProductTags();

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

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || 
        product.Category.id === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(selectedTagId => 
          product.ProductTagRelation.some(tagRelation => tagRelation.ProductTag.id === selectedTagId)
        );

      const currentStock = product.Stock[0]?.stockQuantity || 0;
      let matchesStockLevel = true;
      
      switch (selectedStockLevel) {
        case 'low':
          matchesStockLevel = currentStock <= 10 && currentStock > 0;
          break;
        case 'medium':
          matchesStockLevel = currentStock > 10 && currentStock <= 50;
          break;
        case 'high':
          matchesStockLevel = currentStock > 50;
          break;
        case 'out':
          matchesStockLevel = currentStock === 0;
          break;
        default:
          matchesStockLevel = true;
      }

      return matchesCategory && matchesTags && matchesStockLevel;
    });
  }, [products, selectedCategory, selectedTags, selectedStockLevel]);

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
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StocksHeader />
              <StocksFilterAndActions
                onCategoryFilter={setSelectedCategory}
                onTagFilter={setSelectedTags}
                onStockLevelFilter={setSelectedStockLevel}
                categories={categories}
                productTags={productTags}
              />
              <StockLoading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StocksHeader />
              <StocksFilterAndActions
                onCategoryFilter={setSelectedCategory}
                onTagFilter={setSelectedTags}
                onStockLevelFilter={setSelectedStockLevel}
                categories={categories}
                productTags={productTags}
              />
              <StockError error={error} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StocksHeader />
            <StocksFilterAndActions
              onCategoryFilter={setSelectedCategory}
              onTagFilter={setSelectedTags}
              onStockLevelFilter={setSelectedStockLevel}
              categories={categories}
              productTags={productTags}
            />
            <StocksTable data={filteredProducts} onUpdateStock={handleUpdateStock} />
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


