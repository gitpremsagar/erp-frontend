"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { CreateProductSchema } from "@/lib/Schemas/productForm.schema"
import { useUpdateProduct, useGetProductById } from "@/hooks/products"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { fetchCategories } from "@/redux/slices/categoriesSlice"
import { fetchSubCategories } from "@/redux/slices/subCategoriesSlice"
import { fetchProductTags } from "@/redux/slices/productTagsSlice"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Loader2 } from "lucide-react"

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  const dispatch = useDispatch<AppDispatch>()
  const { updateProduct, loading, error } = useUpdateProduct()
  const { product, loading: productLoading, error: productError } = useGetProductById(productId)

  // Redux state
  const { categories, isLoading: categoriesLoading } = useSelector((state: RootState) => state.categories)
  const { subCategories, isLoading: subCategoriesLoading } = useSelector((state: RootState) => state.subCategories)
  const { productTags, isLoading: tagsLoading } = useSelector((state: RootState) => state.productTags)

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchSubCategories())
    dispatch(fetchProductTags())
  }, [dispatch])

  // Initialize form with product data
  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      mrp: 0,
      productCode: "",
      lowStockLimit: 0,
      overStockLimit: 0,
      categoryId: "",
      subCategoryId: "",
      grammage: 0,
      imageUrl: "",
      tagIds: [],
    },
  })

  // Update form when product data is loaded
  useEffect(() => {
    if (product) {
      const selectedTagIds = product.ProductTagRelation?.map(relation => relation.ProductTag.id) || []
      
      form.reset({
        name: product.name || "",
        mrp: product.mrp || 0,
        productCode: product.productCode || "",
        lowStockLimit: product.lowStockLimit || 0,
        overStockLimit: product.overStockLimit || 0,
        categoryId: product.categoryId || "",
        subCategoryId: product.subCategoryId || "",
        grammage: product.grammage || 0,
        imageUrl: product.imageUrl || "",
        tagIds: selectedTagIds,
      })
    }
  }, [product, form])

  // Handle form submission
  async function onSubmit(values: z.infer<typeof CreateProductSchema>) {
    try {
      await updateProduct(productId, values)
      toast.success("Product updated successfully!")
      router.push("/admin/products")
    } catch (err) {
      toast.error("Failed to update product. Please try again.")
      console.error("Error updating product:", err)
    }
  }

  // Handle tag selection
  const handleTagToggle = (tagId: string) => {
    const currentTags = form.getValues("tagIds")
    const isSelected = currentTags.includes(tagId)
    
    if (isSelected) {
      form.setValue("tagIds", currentTags.filter(id => id !== tagId))
    } else {
      form.setValue("tagIds", [...currentTags, tagId])
    }
  }

  const removeTag = (tagId: string) => {
    const currentTags = form.getValues("tagIds")
    form.setValue("tagIds", currentTags.filter(id => id !== tagId))
  }

  const selectedTags = form.watch("tagIds")

  // Show loading state while fetching product
  if (productLoading) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading product details...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show error state if product fetch failed
  if (productError) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Product</h3>
              <p className="text-muted-foreground mb-4">{productError}</p>
              <Button onClick={() => router.push("/admin/products")}>
                Back to Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show not found state if product doesn't exist
  if (!product) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Product Not Found</h3>
              <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
              <Button onClick={() => router.push("/admin/products")}>
                Back to Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>
            Update the product details, pricing, and categorization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the product as it will appear in the system.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product code" {...field} />
                      </FormControl>
                      <FormDescription>
                        Unique identifier code for the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MRP (₹) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter MRP" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum Retail Price of the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grammage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grammage (g) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter grammage" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Weight of the product in grams.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL of the product image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="lowStockLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low Stock Limit *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter low stock limit" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum stock level before low stock alert.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="overStockLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Over Stock Limit *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter over stock limit" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum stock level before over stock alert.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesLoading ? (
                            <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                          ) : (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the product category.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a sub-category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subCategoriesLoading ? (
                            <SelectItem value="loading" disabled>Loading sub-categories...</SelectItem>
                          ) : (
                            subCategories.map((subCategory) => (
                              <SelectItem key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the product sub-category.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tagIds"
                render={() => (
                  <FormItem>
                    <FormLabel>Product Tags *</FormLabel>
                    <FormDescription>
                      Select one or more tags for this product.
                    </FormDescription>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {tagsLoading ? (
                          <div className="text-sm text-muted-foreground">Loading tags...</div>
                        ) : (
                          productTags.map((tag) => (
                            <div
                              key={tag.id}
                              className={`p-2 border rounded-md cursor-pointer transition-colors ${
                                selectedTags.includes(tag.id)
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => handleTagToggle(tag.id)}
                            >
                              <span className="text-sm">{tag.name}</span>
                            </div>
                          ))
                        )}
                      </div>
                      {selectedTags.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Selected Tags:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tagId) => {
                              const tag = productTags.find(t => t.id === tagId)
                              return tag ? (
                                <Badge key={tagId} variant="secondary" className="flex items-center gap-1">
                                  {tag.name}
                                  <X 
                                    className="h-3 w-3 cursor-pointer" 
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeTag(tagId)
                                    }}
                                  />
                                </Badge>
                              ) : null
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p className="font-medium">Error updating product</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/admin/products")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating Product..." : "Update Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
