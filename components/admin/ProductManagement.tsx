'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export function ProductManagement({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'clothing',
    image_url: '', // User requested Image URL input
    is_featured: false,
    rating: 5.0,
  });

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'clothing',
      image_url: '',
      is_featured: false,
      rating: 5.0,
    });
    setIsEditing(false);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleOpenEdit = (prod: any) => {
    setFormData({
      id: prod.id,
      name: prod.name,
      description: prod.description || '',
      price: prod.price,
      stock: prod.stock,
      category: prod.category || 'clothing',
      image_url: prod.images && prod.images.length > 0 ? prod.images[0] : '',
      is_featured: prod.is_featured || false,
      rating: prod.rating || 5.0,
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setIsLoading(true);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete product: ' + error.message);
    } else {
      toast.success('Product deleted successfully');
      setProducts(products.filter(p => p.id !== id));
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      toast.error('Image upload failed: ' + uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    
    setFormData({ ...formData, image_url: data.publicUrl });
    setIsUploading(false);
    toast.success('Image uploaded successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const productPayload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      images: formData.image_url ? [formData.image_url] : ['/placeholder.png'],
      is_featured: formData.is_featured,
      rating: Number(formData.rating),
    };

    if (isEditing) {
      const { data, error } = await supabase
        .from('products')
        .update(productPayload)
        .eq('id', formData.id)
        .select()
        .single();
        
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Product updated!');
        setProducts(products.map(p => p.id === formData.id ? data : p));
        setIsOpen(false);
      }
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert([productPayload])
        .select()
        .single();
        
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Product created!');
        setProducts([data, ...products]);
        setIsOpen(false);
      }
    }
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold">Manage Products</h2>
        <Button onClick={handleOpenAdd} className="font-semibold rounded-xl px-6 h-11">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-card p-6 rounded-3xl border border-border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.images[0] || '/placeholder.png'} className="w-10 h-10 object-cover rounded-md bg-secondary" alt="" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right font-medium">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(product)} disabled={isLoading}>
                      <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} disabled={isLoading}>
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No products found. Add your first product!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description (optional)</Label>
                <textarea 
                  id="description" 
                  className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" min="0" required value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input id="stock" type="number" min="0" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0 - 5)</Label>
                <Input id="rating" type="number" step="0.1" min="0" max="5" required value={formData.rating} onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image_url">Primary Image</Label>
                <div className="flex gap-4 items-center">
                  {formData.image_url ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border">
                      <img src={formData.image_url} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border border-dashed">
                      <span className="text-xs text-muted-foreground text-center">No Image</span>
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <Input 
                      id="image_upload" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload} 
                      disabled={isUploading}
                      className="cursor-pointer file:text-foreground file:font-medium file:bg-secondary file:border-0 file:rounded-md file:px-4 file:py-1 file:-ml-4 file:-my-1 hover:file:bg-secondary/80 transition-all h-auto py-2"
                    />
                    <p className="text-xs text-muted-foreground">Upload an image directy to Supabase Storage (max 5MB) or use a placeholder.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-2 md:col-span-2 bg-secondary/30 p-4 rounded-xl border border-border/50">
                <div>
                  <Label htmlFor="is_featured" className="text-base font-semibold">Featured Product</Label>
                  <p className="text-sm text-muted-foreground">Display this product on the home page.</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-5 h-5 rounded border-border text-foreground focus:ring-foreground accent-foreground cursor-pointer"
                  />
                  <Label htmlFor="is_featured" className="cursor-pointer">Yes, feature this product</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Product'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
