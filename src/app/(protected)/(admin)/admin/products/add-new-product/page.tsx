"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CreateProductSchema } from "@/lib/Schemas/productForm.schema"
import { useCreateProduct } from "@/hooks/products"
import { useSelector, useDispatch } from "react-redux"
import { RootState,AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { fetchCategories } from "@/redux/slices/categoriesSlice"
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
import { X } from "lucide-react"

export default function AddNewProduct() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { createProduct, loading, error } = useCreateProduct()

  // Redux state
  const { categories, isLoading: categoriesLoading } = useSelector((state: RootState) => state.categories)
  const { productTags, isLoading: tagsLoading } = useSelector((state: RootState) => state.productTags)

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProductTags())
  }, [dispatch])

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      mrp: 0,
      productCode: "",
      lowStockLimit: 0,
      overStockLimit: 0,
      categoryId: "",
      grammage: 100, // Default grammage value
      imageUrl: "https://via.placeholder.com/300x300?text=No+Image", // Default image URL
      tagIds: [],
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateProductSchema>) {
    try {
      await createProduct(values)
      toast.success("Product created successfully!")
      router.push("/admin/products")
    } catch (err) {
      toast.error("Failed to create product. Please try again.")
      console.error("Error creating product:", err)
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

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Create a new product with its details, pricing, and categorization.
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

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <p className="font-medium">Error creating product</p>
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
                  {loading ? "Creating Product..." : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
