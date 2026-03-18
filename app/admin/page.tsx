import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ProductManagement } from '@/components/admin/ProductManagement';
import { AdminSalesChart } from '@/components/admin/AdminSalesChart';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  const tab = searchParams.tab || 'overview';

  // Fetch metrics
  const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
  const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(10);
    
  const { data: allOrders } = await supabase
    .from('orders')
    .select('total, created_at')
    .order('created_at', { ascending: true });
    
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-display font-bold mb-8">Admin Dashboard</h1>

        {/* Custom Tabs */}
        <div className="flex space-x-2 border-b border-border mb-8 overflow-x-auto pb-px">
          <Link href="/admin?tab=overview" className={`px-4 py-2 font-medium border-b-2 whitespace-nowrap ${tab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'} transition-colors`}>
            Overview
          </Link>
          <Link href="/admin?tab=orders" className={`px-4 py-2 font-medium border-b-2 whitespace-nowrap ${tab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'} transition-colors`}>
            Orders
          </Link>
          <Link href="/admin?tab=products" className={`px-4 py-2 font-medium border-b-2 whitespace-nowrap ${tab === 'products' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'} transition-colors`}>
            Products
          </Link>
        </div>

        {tab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="text-muted-foreground font-medium mb-2">Total Orders</h3>
                <p className="text-4xl font-display font-bold">{ordersCount || 0}</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="text-muted-foreground font-medium mb-2">Total Products</h3>
                <p className="text-4xl font-display font-bold">{productsCount || 0}</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="text-muted-foreground font-medium mb-2">Total Users</h3>
                <p className="text-4xl font-display font-bold">{usersCount || 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 mb-6">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-display font-bold mb-6">Revenue Overview</h2>
                <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                  <AdminSalesChart orders={allOrders || []} />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">Recent Orders</h2>
                <div className="bg-card p-4 rounded-3xl border border-border shadow-sm overflow-x-auto">
                  {recentOrders && recentOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">{order.id.split('-')[0].toUpperCase()}</TableCell>
                        <TableCell>{order.profiles?.full_name || order.profiles?.email || 'Guest'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">No recent orders.</p>
              )}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">All Orders</h2>
            </div>
            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm overflow-x-auto">
              <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders?.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">{order.id.split('-')[0].toUpperCase()}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>{order.profiles?.full_name || order.profiles?.email || 'Guest'}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="capitalize">{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <ProductManagement initialProducts={products || []} />
        )}

      </div>
    </div>
  );
}
