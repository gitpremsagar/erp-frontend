"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CreateVehicleSchema } from "@/lib/Schemas/vehicleForm.schema"
import { useCreateVehicle } from "@/hooks/vehicles"

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


export default function AddNewVehicle() {
    const router = useRouter()
    const { createVehicle, loading, error } = useCreateVehicle()

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateVehicleSchema>>({
        resolver: zodResolver(CreateVehicleSchema),
        defaultValues: {
            vehicleName: "",
            vehicleNumber: "",
            vehicleType: "TRUCK",
            capacity: 1,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof CreateVehicleSchema>) {
        try {
            await createVehicle(values)
            toast.success("Vehicle created successfully!")
            router.push("/admin/vehicles")
        } catch (err) {
            toast.error("Failed to create vehicle. Please try again.")
            console.error("Error creating vehicle:", err)
        }
    }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Vehicle</CardTitle>
          <CardDescription>
            Create a new vehicle entry with its details and specifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="vehicleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vehicle name" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for the vehicle (e.g., &quot;Delivery Truck #1&quot;).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vehicle registration number" {...field} />
                      </FormControl>
                      <FormDescription>
                        The official registration number of the vehicle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TRUCK">Truck</SelectItem>
                          <SelectItem value="PICKUP">Pickup</SelectItem>
                          <SelectItem value="VAN">Van</SelectItem>
                          <SelectItem value="CAR">Car</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the type of vehicle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter vehicle capacity" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Vehicle capacity in tons or units (must be a positive number).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p className="font-medium">Error creating vehicle</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/admin/vehicles")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Vehicle..." : "Create Vehicle"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
