"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CreateCustomerSchema } from "@/lib/Schemas/customerForm.schema"
import { useCreateCustomer } from "@/hooks/customers"

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


export default function AddNewCustomer() {
    const router = useRouter()
    const { createCustomer, loading, error } = useCreateCustomer()

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateCustomerSchema>>({
        resolver: zodResolver(CreateCustomerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            address: "",
            aadharNumber: "",
            pan: "",
            gstNumber: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateCustomerSchema>) {
        try {
            await createCustomer(values)
            toast.success("Customer created successfully!")
            router.push("/admin/customers")
        } catch (err) {
            toast.error("Failed to create customer. Please try again.")
            console.error("Error creating customer:", err)
        }
    }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
          <CardDescription>
            Create a new customer account with their details and credentials.
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
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer&apos;s full name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Customer&apos;s complete name as it appears on official documents.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter customer&apos;s email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Customer&apos;s primary email address for communication.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter customer&apos;s phone number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Customer&apos;s primary contact number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter customer&apos;s password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Customer&apos;s login password (minimum 6 characters).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer&apos;s address" {...field} />
                    </FormControl>
                    <FormDescription>
                      Customer&apos;s complete address (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="aadharNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Enter Aadhar number" 
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        12-digit Aadhar number (optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter PAN number" 
                          {...field}
                          style={{ textTransform: 'uppercase' }}
                        />
                      </FormControl>
                      <FormDescription>
                        10-character PAN number (optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gstNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter GST number" 
                          {...field}
                          style={{ textTransform: 'uppercase' }}
                        />
                      </FormControl>
                      <FormDescription>
                        15-character GST number (optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p className="font-medium">Error creating customer</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/admin/customers")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Customer..." : "Create Customer"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}