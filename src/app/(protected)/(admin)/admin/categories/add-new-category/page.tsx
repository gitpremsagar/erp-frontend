"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CreateCategorySchema } from "@/lib/Schemas/categoryForm.schema"
import { useCreateCategory } from "@/hooks/categories"

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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddNewCategory() {
    const router = useRouter()
    const { createCategory, loading, error } = useCreateCategory()

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateCategorySchema>>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateCategorySchema>) {
        try {
            await createCategory(values)
            toast.success("Category created successfully!")
            router.push("/admin/categories")
        } catch (err: unknown) {
            // Check if it's a 409 conflict error
            if (err && typeof err === 'object' && 'response' in err && 
                err.response && typeof err.response === 'object' && 'status' in err.response && 
                err.response.status === 409) {
                toast.error("A category with this name already exists. Please choose a different name.")
            } else {
                toast.error("Unable to create category. Please try again.")
            }
            console.error("Error creating category:", err)
        }
    }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>
            Create a new product category to organize and classify your products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for the product category (e.g., &quot;Electronics&quot;, &quot;Clothing&quot;, &quot;Books&quot;).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter category description (optional)" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of what products belong to this category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p className="font-medium">Unable to create category</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/admin/categories")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Category..." : "Create Category"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
