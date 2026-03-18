'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const addressSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(4, "Valid pincode required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormValues) => void;
  id?: string;
}

export function AddressForm({ onSubmit, id }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="John Doe" {...register('fullName')} className="h-12 rounded-xl" />
          {errors.fullName && <p className="text-sm font-medium text-destructive">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+1 (555) 000-0000" {...register('phone')} className="h-12 rounded-xl" />
          {errors.phone && <p className="text-sm font-medium text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine1">Address Line 1</Label>
        <Input id="addressLine1" placeholder="123 Main St" {...register('addressLine1')} className="h-12 rounded-xl" />
        {errors.addressLine1 && <p className="text-sm font-medium text-destructive">{errors.addressLine1.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
        <Input id="addressLine2" placeholder="Apt 4B" {...register('addressLine2')} className="h-12 rounded-xl" />
        {errors.addressLine2 && <p className="text-sm font-medium text-destructive">{errors.addressLine2.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="New York" {...register('city')} className="h-12 rounded-xl" />
          {errors.city && <p className="text-sm font-medium text-destructive">{errors.city.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" placeholder="NY" {...register('state')} className="h-12 rounded-xl" />
          {errors.state && <p className="text-sm font-medium text-destructive">{errors.state.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">ZIP / Pincode</Label>
          <Input id="pincode" placeholder="10001" {...register('pincode')} className="h-12 rounded-xl" />
          {errors.pincode && <p className="text-sm font-medium text-destructive">{errors.pincode.message}</p>}
        </div>
      </div>
    </form>
  );
}

