"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CreateProductTagSchema } from "@/lib/Schemas/productTagForm.schema"
import { useCreateProductTag } from "@/hooks/productTags"

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


export default function AddNewProductTag() {
    const router = useRouter()
    const { createProductTag, loading, error } = useCreateProductTag()

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateProductTagSchema>>({
        resolver: zodResolver(CreateProductTagSchema),
        defaultValues: {
            name: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateProductTagSchema>) {
        try {
            await createProductTag(values)
            toast.success("Product tag created successfully!")
            router.push("/admin/tags")
        } catch (err: any) {
            // Check if it's a 409 conflict error
            if (err?.response?.status === 409) {
                toast.error("A product tag with this name already exists. Please choose a different name.")
            } else {
                toast.error("Unable to create product tag. Please try again.")
            }
            console.error("Error creating product tag:", err)
        }
    }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product Tag</CardTitle>
          <CardDescription>
            Create a new product tag to categorize and organize your products.
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
                    <FormLabel>Tag Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product tag name" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for the product tag (e.g., &quot;New Arrivals&quot;, &quot;Slow Moving&quot;, &quot;Best Sellers&quot;).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p className="font-medium">Unable to create product tag</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/admin/tags")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Tag..." : "Create Tag"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
